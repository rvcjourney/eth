'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowUp } from 'lucide-react';
import { STUDIO_SETTINGS } from '@/lib/content';
import { BRAND } from '@/lib/brand';
import SocialLinks from '@/components/SocialLinks';

const navigation = [
  { name: 'About Us', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Book a Free Consultation', path: '/contact' }
];

const expertise = ['Tailored Colour Palettes', '2D Drawings', '3D Renders', 'On-Site Execution', 'Completed Interiors'];

export default function Footer() {
  const settings = STUDIO_SETTINGS;
  const phone = settings.phone || BRAND.phoneDisplay;
  const email = settings.email || BRAND.email;
  const hasHours = Boolean(settings.hours_weekday || settings.hours_weekend);

  return (
    <footer className="bg-white border-t border-gold/10 pt-20 pb-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Brand Column */}
        <div className="space-y-6">
          <Link href="/" className="block w-fit" aria-label="Ethereal Spaces home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-dark.png" alt="Ethereal Spaces" width={1024} height={506} className="h-20 w-auto object-contain" />
          </Link>
          <p className="text-sm text-ivory/80 leading-relaxed max-w-xs font-light">
            {settings.about_text}
          </p>
          {/* Instagram has its own floating button, so it isn't repeated here. */}
          <SocialLinks exclude={['instagram']} />
        </div>

        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium">Explore</h4>
          <ul className="space-y-3">
            {navigation.map((link) => (
              <li key={link.path}>
                <Link href={link.path} className="text-sm text-ivory/80 hover:text-gold transition-colors duration-300 font-light">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium">Expertise</h4>
          <ul className="space-y-3 text-sm text-ivory/80 font-light">
            {expertise.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium">Get in Touch</h4>
          <ul className="space-y-2 text-sm text-ivory/80 font-light">
            <li>
              <a href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-3 py-2 hover:text-gold transition-colors">
                <Phone size={14} className="text-gold shrink-0" />
                <span>{phone}</span>
              </a>
            </li>
            <li>
              <a href={BRAND.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 py-2 hover:text-gold transition-colors">
                <MessageCircle size={14} className="text-gold shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="flex items-center gap-3 py-2 hover:text-gold transition-colors break-all">
                <Mail size={14} className="text-gold shrink-0" />
                <span>{email}</span>
              </a>
            </li>
            {settings.address && (
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-gold mt-1 shrink-0" />
                <span>{settings.address}</span>
              </li>
            )}
            {hasHours && (
              <li className="flex items-start gap-3">
                <Clock size={14} className="text-gold mt-1 shrink-0" />
                <div>
                  {settings.hours_weekday && <p>{settings.hours_weekday}: {settings.hours_weekday_time}</p>}
                  {settings.hours_weekend && <p className="text-ivory/80 mt-1">{settings.hours_weekend}: {settings.hours_weekend_time}</p>}
                </div>
              </li>
            )}
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ivory/80 tracking-wider">
        <p>© {new Date().getFullYear()} {BRAND.legalName}. {BRAND.tagline}.</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 hover:text-gold transition-colors duration-300 border border-gold/15 hover:border-gold/30 px-4 py-2.5 rounded-full"
          aria-label="Scroll to top"
        >
          <span>Top</span>
          <ArrowUp size={10} />
        </button>
      </div>
    </footer>
  );
}
