'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { whatsappLink, enquiryWhatsAppMessage } from '@/lib/brand';

const DISMISS_KEY = 'ethereal_contact_popup_dismissed';

export default function AutoContactPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showWhatsAppFallback, setShowWhatsAppFallback] = useState(false);

  const suppressed = pathname === '/contact';

  useEffect(() => {
    if (suppressed) return;
    try {
      if (localStorage.getItem(DISMISS_KEY) === 'true') return;
    } catch {
      return;
    }

    // Only invite engaged visitors: after 40 seconds, or once they have scrolled through 60% of a page.
    const open = () => setIsOpen(true);
    const timer = setTimeout(open, 40000);
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable > 0.6) open();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [suppressed]);

  const rememberDismissed = () => {
    try {
      localStorage.setItem(DISMISS_KEY, 'true');
    } catch {
      // Storage unavailable; the popup may show again next visit.
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    rememberDismissed();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please share your name and phone number.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    setShowWhatsAppFallback(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'Callback popup', website: honeypot })
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMsg(result.error || 'We could not send your details just now. Please message us on WhatsApp instead.');
        setShowWhatsAppFallback(true);
        return;
      }

      setSubmitted(true);
      rememberDismissed();
    } catch {
      setErrorMsg('We could not reach our server. Please message us on WhatsApp instead.');
      setShowWhatsAppFallback(true);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappHref = whatsappLink(enquiryWhatsAppMessage(formData));
  const inputClass = 'w-full bg-dark-bg border border-gold/15 focus:border-gold focus:outline-none px-3 py-2.5 text-sm text-ivory placeholder-ivory/50 rounded-lg transition-colors';

  return (
    <AnimatePresence>
      {isOpen && !suppressed && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Request a callback"
          className="fixed bottom-36 right-4 left-4 md:left-auto md:bottom-44 md:right-8 z-50 max-w-sm p-6 bg-dark-surface rounded-2xl shadow-2xl border border-gold/15 text-ivory"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full border border-gold/15 flex items-center justify-center text-ivory/75 hover:text-ivory transition-colors"
            aria-label="Close"
          >
            <X size={14} />
          </button>

          {submitted ? (
            <div className="text-center py-4 space-y-4" role="status">
              <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold mx-auto">
                <CheckCircle size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-light">Thank You</h3>
              <p className="text-sm text-ivory/80 leading-relaxed font-light">We have your details and will call you back shortly.</p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-ivory hover:bg-gold text-dark-bg text-xs uppercase tracking-widest rounded-full transition-colors"
              >
                <MessageCircle size={13} />
                Also send on WhatsApp
              </a>
              <button onClick={() => setIsOpen(false)} className="text-xs uppercase tracking-widest text-ivory/75 hover:text-ivory transition-colors">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1 pr-8">
                <span className="text-xs tracking-[0.3em] uppercase text-gold">Free Consultation</span>
                <h3 className="text-2xl font-light">Planning an interior?</h3>
                <p className="text-sm font-light leading-relaxed text-ivory/80">Leave your number and we will call you back.</p>
              </div>

              {/* Spam trap: hidden from people and screen readers; bots that fill it are ignored. */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="absolute -left-[9999px] w-px h-px opacity-0"
              />

              <div className="space-y-3">
                <input type="text" required autoComplete="name" placeholder="Your name" aria-label="Your name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} className={inputClass} />
                <input type="tel" required autoComplete="tel" placeholder="Phone / WhatsApp" aria-label="Phone or WhatsApp number" value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} className={inputClass} />
                <textarea placeholder="Which space? (optional)" aria-label="Which space are you planning" value={formData.message} onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))} rows={2} className={`${inputClass} resize-none`} />
              </div>

              {errorMsg && (
                <div className="space-y-2" role="alert">
                  <p className="text-xs text-red-700">{errorMsg}</p>
                  {showWhatsAppFallback && (
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-gold hover:text-ivory transition-colors">
                      <MessageCircle size={12} />
                      Send on WhatsApp
                    </a>
                  )}
                </div>
              )}

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-3 bg-ivory hover:bg-gold disabled:opacity-50 text-dark-bg text-xs uppercase tracking-widest rounded-full transition-colors flex items-center justify-center gap-1.5"
                >
                  {submitting ? 'Sending…' : (<><Send size={11} /><span>Request Callback</span></>)}
                </button>
                <button type="button" onClick={handleClose} className="px-3 py-3 text-ivory/75 hover:text-ivory text-xs uppercase tracking-widest transition-colors">
                  Later
                </button>
              </div>
            </form>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
