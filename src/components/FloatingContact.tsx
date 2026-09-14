'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { BRAND } from '@/lib/brand';
import { completeCallbackPopup } from '@/lib/popupPrefs';
import { SocialIcon } from '@/components/SocialLinks';

export default function FloatingContact() {
  // Visitors who call or WhatsApp us have already reached out, so the callback popup shouldn't ask them again.
  return (
    <div className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40 flex flex-col items-end gap-3">
      {BRAND.social.instagram && (
        <a
          href={BRAND.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Ethereal Spaces on Instagram"
          title="Instagram"
          className="w-12 h-12 rounded-full bg-dark-bg border border-gold/20 text-ivory shadow-lg flex items-center justify-center hover:bg-dark-surface transition-colors duration-300"
        >
          <SocialIcon network="instagram" />
        </a>
      )}
      <a
        href={BRAND.phoneHref}
        onClick={completeCallbackPopup}
        aria-label={`Call ${BRAND.phoneDisplay}`}
        className="w-12 h-12 rounded-full bg-dark-bg border border-gold/20 text-ivory shadow-lg flex items-center justify-center hover:bg-dark-surface transition-colors duration-300"
      >
        <Phone size={18} strokeWidth={1.5} />
      </a>
      <a
        href={BRAND.whatsappHref}
        onClick={completeCallbackPopup}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group h-12 pl-4 pr-5 rounded-full bg-ivory text-dark-bg shadow-lg flex items-center gap-2 hover:bg-gold transition-colors duration-300"
      >
        <MessageCircle size={18} strokeWidth={1.5} />
        <span className="text-xs uppercase tracking-[0.2em] font-medium">WhatsApp</span>
      </a>
    </div>
  );
}
