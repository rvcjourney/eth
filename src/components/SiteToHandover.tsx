'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SafeImage from '@/components/SafeImage';

const PAIRS = [
  {
    room: 'Kitchen',
    before: '/images/portfolio/linear-light-residence/before-kitchen.jpg',
    after: '/images/portfolio/linear-light-residence/03.jpg',
  },
  {
    room: 'Living Room',
    before: '/images/portfolio/linear-light-residence/before-living.jpg',
    after: '/images/portfolio/linear-light-residence/01.jpg',
  },
];

export default function SiteToHandover() {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4 max-w-xl">
          <span className="text-xs tracking-[0.3em] uppercase text-gold block">From Site to Handover</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-ivory">We Build What We Design</h2>
          <p className="text-sm font-light text-ivory/80 leading-relaxed">
            Real photographs from one of our completed homes: the same rooms during execution, and on the day of handover.
          </p>
        </div>
        <Link
          href="/projects/linear-light-residence"
          className="py-3 text-xs uppercase tracking-[0.2em] text-champagne hover:text-gold flex items-center gap-1.5 transition-colors group"
        >
          <span>View the Residence</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {PAIRS.map((pair, idx) => (
          <motion.div
            key={pair.room}
            initial={{ y: 30 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              {[
                { src: pair.before, label: 'On Site' },
                { src: pair.after, label: 'Handover' },
              ].map((shot) => (
                <figure key={shot.label} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-dark-surface">
                  <SafeImage
                    src={shot.src}
                    alt={`${pair.room}: ${shot.label.toLowerCase()}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <figcaption className="absolute left-3 bottom-3 bg-dark-bg/90 px-3 py-1 rounded-full text-xs uppercase tracking-[0.2em] text-ivory">
                    {shot.label}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-champagne">{pair.room}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
