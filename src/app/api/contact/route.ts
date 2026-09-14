import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { BRAND } from '@/lib/brand';

// Enquiries from the contact form and callback popup are emailed to the studio; there is no database.
// Configure in Vercel → Project → Settings → Environment Variables (see .env.example):
//   SMTP_USER, SMTP_PASS        Gmail address and its 16-character App Password
//   CONTACT_RECIPIENT_EMAILS    optional, comma-separated; defaults to the studio email

export const runtime = 'nodejs';

const FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  phone: 'Phone / WhatsApp',
  email: 'Email',
  project_type: 'Project Type',
  budget_range: 'Budget',
  location: 'City / Area',
  message: 'Details',
  source: 'Submitted From',
};

const MAX_FIELD_LENGTH = 3000;

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const WHATSAPP_FALLBACK_ERROR = 'We could not send your enquiry just now. Please send it on WhatsApp or call us instead.';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;

  // Spam trap: the "website" field is hidden from people, so only bots fill it in. Pretend success.
  if (typeof raw.website === 'string' && raw.website.trim()) {
    return NextResponse.json({ success: true });
  }

  const data: Record<string, string> = {};
  for (const key of Object.keys(FIELD_LABELS)) {
    const value = raw[key];
    if (typeof value === 'string' && value.trim()) data[key] = value.trim().slice(0, MAX_FIELD_LENGTH);
  }

  if (!data.name || (!data.phone && !data.email)) {
    return NextResponse.json({ error: 'Please share your name and a phone number or email.' }, { status: 400 });
  }

  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  const subject = `New website enquiry: ${data.name}${data.project_type ? ` · ${data.project_type}` : ''}`;
  const rows = Object.entries(data).map(([key, value]) => ({ label: FIELD_LABELS[key], value }));

  // One-click reply links for the studio. Indian mobile numbers are often typed without the country code.
  const visitorDigits = (data.phone ?? '').replace(/\D/g, '');
  const visitorWhatsApp = visitorDigits.length === 10 ? `91${visitorDigits}` : visitorDigits;
  const replyWhatsApp = visitorWhatsApp.length >= 10
    ? `https://wa.me/${visitorWhatsApp}?text=${encodeURIComponent(`Hello ${data.name}, thank you for contacting Ethereal Spaces.`)}`
    : '';

  const text = [
    `New enquiry from the Ethereal Spaces website (${submittedAt} IST)`,
    '',
    ...rows.map((row) => `${row.label}: ${row.value}`),
    '',
    replyWhatsApp ? `Reply on WhatsApp: ${replyWhatsApp}` : '',
  ].join('\n');

  const button = (href: string, label: string) =>
    `<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 18px;border-radius:999px;background:#1F1A17;color:#F5F2ED;text-decoration:none;font-size:13px;">${label}</a>`;

  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:32px 16px;background:#F5F2ED;font-family:Arial,Helvetica,sans-serif;color:#1F1A17;">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #DDD4C9;border-radius:16px;padding:32px;">
    <p style="margin:0 0 4px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#6B5646;">Ethereal Spaces · Website Enquiry</p>
    <h1 style="margin:0 0 4px;font-family:Georgia,serif;font-weight:normal;font-size:26px;">${escapeHtml(data.name)}</h1>
    <p style="margin:0 0 24px;font-size:13px;color:#5C4E43;">${escapeHtml(submittedAt)} IST</p>
    ${rows.map((row) => `
    <div style="margin-bottom:16px;">
      <div style="font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#6B5646;margin-bottom:4px;">${escapeHtml(row.label)}</div>
      <div style="font-size:15px;line-height:1.5;">${escapeHtml(row.value).replace(/\n/g, '<br />')}</div>
    </div>`).join('')}
    <div style="margin-top:24px;padding-top:20px;border-top:1px solid #ECE6DE;">
      ${replyWhatsApp ? button(replyWhatsApp, 'Reply on WhatsApp') : ''}
      ${data.phone ? button(`tel:${data.phone.replace(/[^+\d]/g, '')}`, 'Call') : ''}
      ${data.email ? button(`mailto:${data.email}`, 'Reply by Email') : ''}
    </div>
  </div>
</body></html>`;

  const smtpUser = process.env.SMTP_USER?.trim() ?? '';
  // Gmail displays App Passwords in groups of four; spaces are not part of the password.
  const smtpPass = process.env.SMTP_PASS?.replace(/\s+/g, '') ?? '';
  const recipients = (process.env.CONTACT_RECIPIENT_EMAILS || BRAND.email)
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

  if (!smtpUser || !smtpPass) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[contact] Email is not configured (SMTP_USER / SMTP_PASS missing). Enquiry was not delivered.');
      return NextResponse.json({ error: WHATSAPP_FALLBACK_ERROR, whatsappFallback: true }, { status: 503 });
    }

    // Local development without email settings: keep a copy on disk instead (the folder is git-ignored).
    const dir = path.join(process.cwd(), '.leads');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, `lead-${Date.now()}.json`);
    fs.writeFileSync(file, JSON.stringify({ subject, recipients, data, submittedAt }, null, 2));
    console.log(`[contact] Email not configured; saved enquiry to ${file}`);
    return NextResponse.json({ success: true, mode: 'local' });
  }

  try {
    const port = Number(process.env.SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Ethereal Spaces Website" <${smtpUser}>`,
      to: recipients,
      replyTo: data.email || undefined,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] Failed to send enquiry email:', err);
    return NextResponse.json({ error: WHATSAPP_FALLBACK_ERROR, whatsappFallback: true }, { status: 502 });
  }
}
