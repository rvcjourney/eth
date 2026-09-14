'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' }
];

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);
  // Project pages open on a full-bleed photo, where a transparent header would be unreadable.
  const overPhotoHero = /^\/projects\/[^/]+$/.test(pathname ?? '');

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled || isOpen || overPhotoHero
          ? 'py-3 glass-panel-heavy shadow-sm border-b border-gold/10'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center group" aria-label="Ethereal Spaces home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-dark.png"
            alt="Ethereal Spaces"
            width={1024}
            height={506}
            className="h-14 md:h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 relative py-1 hover:text-gold ${
                isActive(link.path) ? 'text-gold' : 'text-ivory/80'
              }`}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-0 h-[1px] bg-gold transition-all duration-500 ${
                  isActive(link.path) ? 'w-full' : 'w-0'
                }`}
              />
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 px-5 py-2.5 bg-ivory hover:bg-gold text-dark-bg text-xs uppercase tracking-[0.2em] rounded-full transition-colors duration-300"
          >
            Book Consultation
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-ivory hover:text-gold transition-colors duration-300"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[80px] bg-dark-bg z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-all duration-500 ease-in-out border-t border-gold/10 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-x-full'
        }`}
      >
        {[{ name: 'Home', path: '/' }, ...navLinks].map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`text-2xl font-serif tracking-wide transition-colors duration-300 ${
              (link.path === '/' ? pathname === '/' : isActive(link.path)) ? 'text-gold' : 'text-ivory'
            }`}
          >
            {link.name}
          </Link>
        ))}
        <Link
          href="/contact"
          className="mt-4 px-8 py-4 bg-ivory text-dark-bg text-xs uppercase tracking-[0.2em] rounded-full"
        >
          Book Consultation
        </Link>
      </div>
    </header>
  );
}
