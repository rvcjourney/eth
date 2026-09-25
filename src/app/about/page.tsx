'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { COLOUR_PALETTES, MATERIAL_SWATCHES } from '@/lib/content';

const VALUES = [
  'Modern aesthetic, functional spaces',
  'Design that enhances everyday living',
  'Natural materials, used elegantly',
  'Warm tones with refined contrasts'
];

const DELIVERABLES = [
  { title: '2D Drawings', image: '/images/portfolio/drawings/floor-plan.webp', href: '/services' },
  { title: '3D Renders', image: '/images/portfolio/refined-comfort/01.jpg', href: '/projects' },
  { title: 'Site Work', image: '/images/portfolio/site-work/09.jpg', href: '/services' },
  { title: 'Completed Projects', image: '/images/portfolio/marble-and-walnut-home/01.jpg', href: '/projects' }
];

export default function AboutPage() {
  return (
    <div className="relative pt-32 overflow-hidden bg-dark-bg">

      {/* 1. STORY */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <div className="md:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="text-xs tracking-[0.3em] uppercase text-gold">About Us</span>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-ivory leading-[1.02]">
              Interior Design as an <span className="text-gold italic">Emotional</span> Conduit
            </h1>
          </div>
          <p className="text-base font-light text-ivory/80 leading-relaxed max-w-xl text-justify">
            We are passionate creators of extraordinary environments, dedicated to transforming spaces into timeless expressions of beauty, functionality, and personal style.
            Ethereal Spaces emerged from a single, guiding belief: that an interior is not merely a physical space, but an emotional conduit.
          </p>
          <p className="text-base font-light text-ivory/80 leading-relaxed max-w-xl text-justify">
            We listen, we understand, and we translate dreams into tangible realities that exceed expectations. Through meticulous attention to detail, innovative solutions, and an unwavering commitment to excellence, we create spaces that are not just beautiful, but truly meaningful.
          </p>
        </div>

        <div className="md:col-span-5 relative aspect-[3/4] rounded-t-[999px] rounded-b-2xl overflow-hidden bg-dark-surface">
          <Image src="/images/portfolio/hero/about.jpg" alt="Arched interior with a cane lounge chair" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover" priority />
        </div>
      </section>

      {/* 2. VALUES */}
      <section className="py-24 border-t border-b border-gold/10 bg-dark-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUES.map((value, idx) => (
            <motion.div
              key={value}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="space-y-4"
            >
              <span className="text-4xl font-serif text-gold/40 block">0{idx + 1}</span>
              <p className="text-2xl font-serif text-ivory leading-snug">{value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. TAILORED COLOUR PALETTES */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <span className="text-xs tracking-[0.3em] uppercase text-gold block">Tailored Colour Palettes</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-ivory leading-tight">A Palette That Reflects You</h2>
          </div>
          <p className="text-base font-light text-ivory/80 leading-relaxed text-justify">
            We carefully select the perfect colour palette for each client, ensuring harmony with their lifestyle, personality, and space. Every detail is customised to create a unique atmosphere that reflects individuality.
          </p>
          <div className="space-y-5">
            {COLOUR_PALETTES.map((palette) => (
              <div key={palette.name} className="flex items-center gap-5">
                <div className="flex">
                  {palette.colors.map((color, i) => (
                    <span
                      key={color}
                      className="w-10 h-10 rounded-full border-2 border-dark-bg"
                      style={{ backgroundColor: color, marginLeft: i === 0 ? 0 : -10 }}
                      title={color}
                    />
                  ))}
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-champagne">{palette.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-5 gap-3">
          {MATERIAL_SWATCHES.map((material, idx) => (
            <motion.figure
              key={material.src}
              initial={{ y: 30 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className="space-y-3"
            >
              <div className="relative aspect-[1/3] rounded-full overflow-hidden bg-dark-surface">
                <Image src={material.src} alt={material.label} fill sizes="15vw" className="object-cover" />
              </div>
              <figcaption className="text-xs uppercase tracking-[0.15em] text-champagne text-center">{material.label}</figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* 4. WHAT WE DELIVER */}
      <section className="py-32 bg-dark-surface border-t border-gold/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="space-y-4 mb-16 text-center">
            <span className="text-xs tracking-[0.3em] uppercase text-gold">What We Deliver</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-ivory">From First Line to Final Finish</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DELIVERABLES.map((item) => (
              <Link key={item.title} href={item.href} className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-dark-bg block">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" quality={90} className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-center justify-between text-white">
                  <h3 className="text-2xl font-light">{item.title}</h3>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-28 px-6 text-center border-t border-gold/10 space-y-6">
        <h2 className="text-4xl md:text-5xl font-light text-ivory">Let&apos;s Reimagine Your Space</h2>
        <Link href="/contact" className="inline-block px-10 py-4 bg-ivory hover:bg-gold text-dark-bg text-xs uppercase tracking-[0.25em] rounded-full transition-colors duration-300">
          Book a Free Consultation
        </Link>
      </section>
    </div>
  );
}
