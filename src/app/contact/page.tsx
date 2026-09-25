'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { CONTACT_FORM_FIELDS, STUDIO_SETTINGS, FormField } from '@/lib/content';
import { BRAND, whatsappLink, enquiryWhatsAppMessage } from '@/lib/brand';

const FIELDS = CONTACT_FORM_FIELDS.filter((f) => f.is_active).sort((a, b) => a.sort_order - b.sort_order);

const initialValues = (formFields: FormField[]) =>
  Object.fromEntries(
    formFields.map((f) => [f.id, f.field_type === 'select' && f.options.length > 0 ? f.options[0] : ''])
  ) as Record<string, string>;

export default function ContactPage() {
  const [formData, setFormData] = useState<Record<string, string>>(() => initialValues(FIELDS));
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sentData, setSentData] = useState<Record<string, string> | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showWhatsAppFallback, setShowWhatsAppFallback] = useState(false);

  const settings = STUDIO_SETTINGS;
  const phone = settings.phone || BRAND.phoneDisplay;
  const email = settings.email || BRAND.email;
  const hasHours = Boolean(settings.hours_weekday || settings.hours_weekend);

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setShowWhatsAppFallback(false);

    const missing = FIELDS.find((field) => field.is_required && !formData[field.id]?.trim());
    if (missing) {
      setErrorMsg(`Please fill out the required field: ${missing.label}`);
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'Contact page', website: honeypot })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMsg(result.error || 'We could not send your enquiry just now. Please send it on WhatsApp or call us instead.');
        setShowWhatsAppFallback(true);
        return;
      }

      setSentData(formData);
      setFormData(initialValues(FIELDS));
    } catch {
      setErrorMsg('We could not reach our server. Please send your enquiry on WhatsApp or call us instead.');
      setShowWhatsAppFallback(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = 'w-full bg-dark-bg border border-gold/15 focus:border-gold focus:outline-none px-4 py-3 text-sm text-ivory placeholder-ivory/50 rounded-xl transition-colors';

  return (
    <div className="min-h-screen pt-32 pb-24 bg-dark-bg text-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">

        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-4">
            <span className="text-xs tracking-[0.3em] uppercase text-gold block">Contact Us</span>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight leading-[1.02]">Let&apos;s Reimagine Your Space</h1>
            <p className="text-base text-ivory/80 leading-relaxed font-light">
              Tell us about your home, restaurant or workspace. Share as much or as little as you like, and we will get back to you to arrange a consultation.
            </p>
          </div>

          <div className="p-8 bg-ivory text-dark-bg rounded-2xl space-y-5">
            <h2 className="text-3xl font-light">Prefer to talk?</h2>
            <p className="text-sm text-dark-bg/80 font-light">Call or message us directly.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={BRAND.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex-1 px-5 py-3 bg-dark-bg text-ivory hover:bg-dark-secondary text-xs uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-2 transition-colors">
                <MessageCircle size={14} />
                WhatsApp
              </a>
              <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="flex-1 px-5 py-3 border border-dark-bg/30 hover:border-dark-bg text-xs uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-2 transition-colors">
                <Phone size={14} />
                Call
              </a>
            </div>
          </div>

          <ul className="space-y-6 text-sm text-ivory/80 font-light">
            <li className="flex items-start gap-4">
              <span className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0"><Phone size={14} /></span>
              <div className="pt-1.5">
                <p className="text-ivory font-medium">Phone / WhatsApp</p>
                <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="hover:text-gold transition-colors">{phone}</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0"><Mail size={14} /></span>
              <div className="pt-1.5">
                <p className="text-ivory font-medium">Email</p>
                <a href={`mailto:${email}`} className="hover:text-gold transition-colors break-all">{email}</a>
              </div>
            </li>
            {settings.address && (
              <li className="flex items-start gap-4">
                <span className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0"><MapPin size={14} /></span>
                <div className="pt-1.5">
                  <p className="text-ivory font-medium">Studio</p>
                  <p>{settings.address}</p>
                </div>
              </li>
            )}
            {hasHours && (
              <li className="flex items-start gap-4">
                <span className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-gold shrink-0"><Clock size={14} /></span>
                <div className="pt-1.5">
                  <p className="text-ivory font-medium">Hours</p>
                  {settings.hours_weekday && <p>{settings.hours_weekday}: {settings.hours_weekday_time}</p>}
                  {settings.hours_weekend && <p className="text-ivory/80">{settings.hours_weekend}: {settings.hours_weekend_time}</p>}
                </div>
              </li>
            )}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-dark-surface p-8 md:p-12 rounded-2xl border border-gold/10">
            {sentData ? (
              <div className="text-center py-12 space-y-6" role="status">
                <div className="w-16 h-16 rounded-full border border-gold flex items-center justify-center text-gold mx-auto">
                  <CheckCircle size={32} strokeWidth={1} />
                </div>
                <h3 className="text-4xl font-light text-ivory">Thank You</h3>
                <p className="text-sm text-ivory/80 max-w-sm mx-auto leading-relaxed font-light">
                  Your enquiry has been emailed to our studio. We will be in touch shortly to arrange your consultation.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <a
                    href={whatsappLink(enquiryWhatsAppMessage(sentData))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-ivory hover:bg-gold text-dark-bg text-xs uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle size={14} />
                    Also send on WhatsApp
                  </a>
                  <button
                    onClick={() => setSentData(null)}
                    className="px-6 py-3 border border-gold/30 hover:border-gold text-gold text-xs uppercase tracking-[0.2em] transition-colors rounded-full"
                  >
                    Send another enquiry
                  </button>
                </div>
                <p className="text-xs text-ivory/70">WhatsApp is optional, and usually gets the quickest reply.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
                <div className="border-b border-gold/10 pb-4">
                  <h2 className="text-3xl font-light">Project Enquiry</h2>
                  <p className="text-sm text-ivory/80 mt-1">Fields marked * are required.</p>
                </div>

                {/* Spam trap: hidden from people and screen readers; bots that fill it are ignored. */}
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {FIELDS.map((field) => (
                    <div key={field.id} className={`space-y-2 flex flex-col ${field.field_type === 'textarea' ? 'md:col-span-2' : ''}`}>
                      <label htmlFor={field.id} className="text-xs uppercase tracking-[0.2em] text-ivory/75">
                        {field.label}{field.is_required && <span className="text-gold"> *</span>}
                      </label>

                      {field.field_type === 'textarea' ? (
                        <textarea
                          id={field.id}
                          required={field.is_required}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          rows={5}
                          placeholder="Rooms, size, style you love, timeline…"
                          className={`${inputClass} resize-none leading-relaxed`}
                        />
                      ) : field.field_type === 'select' ? (
                        <select
                          id={field.id}
                          required={field.is_required}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className={inputClass}
                        >
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field.id}
                          type={field.field_type}
                          required={field.is_required}
                          value={formData[field.id] || ''}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          autoComplete={field.field_type === 'email' ? 'email' : field.field_type === 'tel' ? 'tel' : field.id === 'name' ? 'name' : undefined}
                          className={inputClass}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {errorMsg && (
                  <div className="space-y-3" role="alert">
                    <p className="text-sm text-red-700">{errorMsg}</p>
                    {showWhatsAppFallback && (
                      <a
                        href={whatsappLink(enquiryWhatsAppMessage(formData))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-ivory hover:bg-gold text-dark-bg text-xs uppercase tracking-[0.2em] rounded-full transition-colors"
                      >
                        <MessageCircle size={14} />
                        Send this enquiry on WhatsApp
                      </a>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-ivory hover:bg-gold disabled:opacity-50 text-dark-bg text-xs uppercase tracking-[0.25em] transition-colors duration-300 rounded-full flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border border-dark-bg border-t-transparent rounded-full animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <Send size={12} />
                      <span>Send Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Where we work. One honest list beats a landing page per locality. */}
        <section className="mt-24 pt-12 border-t border-gold/10 space-y-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs tracking-[0.3em] uppercase text-gold block">Areas We Serve</span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight">Across Pune</h2>
            <p className="text-base text-ivory/80 leading-relaxed font-light">
              We design and execute interiors throughout Pune and Pimpri-Chinchwad. If your address
              is not listed, ask anyway.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {BRAND.serviceAreas.map((area) => (
              <li
                key={area}
                className="px-4 py-2 text-sm font-light text-ivory/80 bg-dark-surface border border-gold/10 rounded-full"
              >
                {area}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
}
