'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye, ArrowUpRight } from 'lucide-react';
import { GALLERY_ITEMS } from '@/lib/content';

interface InteractiveGalleryProps {
  tag?: string;
  title?: string;
  description?: string;
  limit?: number;
}

export default function InteractiveGallery({ tag, title, description, limit }: InteractiveGalleryProps) {
  const items = GALLERY_ITEMS;
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(items.map((item) => item.category)))];

  // Filter items
  const matchingItems = activeFilter === 'All'
    ? items
    : items.filter((item) => item.category === activeFilter);
  const filteredItems = limit ? matchingItems.slice(0, limit) : matchingItems;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev! + 1));
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === 'Escape') setLightboxIndex(null);
    if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev! - 1));
    if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  return (
    <section className="py-24 px-6 md:px-12 bg-dark-bg border-b border-gold/5 relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-champagne/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="text-xs tracking-[0.3em] uppercase text-gold block">
              {tag || 'Studio Archive'}
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-ivory">
              {title || 'Curated Details'}
            </h2>
            <p className="text-sm md:text-base text-ivory/80 max-w-md leading-relaxed">
              {description || 'Explore the raw materials, textures, and bespoke joinery details that form the foundation of our spatial signature.'}
            </p>
          </div>

          {/* Dynamic Filter Buttons */}
          <div className="flex flex-wrap gap-2 md:gap-3 bg-dark-surface/60 backdrop-blur-md p-1.5 rounded-xl border border-gold/5 self-start md:self-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`relative px-4 py-2.5 min-h-10 text-xs md:text-xs uppercase tracking-widest transition-all duration-500 rounded-lg font-medium cursor-pointer ${
                  activeFilter === category 
                    ? 'text-dark-bg font-semibold' 
                    : 'text-ivory/75 hover:text-ivory'
                }`}
              >
                {activeFilter === category && (
                  <motion.span
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-gold rounded-lg -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive masonry-like grid */}
          <motion.div
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                // Architectural height offset pattern
                const heightClass = index % 4 === 1 ? 'md:translate-y-6' : index % 4 === 3 ? 'md:-translate-y-6' : '';
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    key={item.id}
                    className={`group relative overflow-hidden bg-white border border-gold/10 rounded-2xl transition-all duration-500 hover:shadow-xl hover:border-gold/20 cursor-pointer ${heightClass}`}
                    onClick={() => setLightboxIndex(index)}
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                      <Image
                        src={item.image_url}
                        alt={item.caption || 'Curated Detail'}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-108"
                      />
                      
                      {/* Spotlight Glassmorphic Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8" />
                      
                      <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                        <div className="flex justify-end">
                          <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                            <Eye size={14} />
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-white">
                          <span className="text-xs uppercase tracking-[0.25em] text-white/70 font-semibold bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-full w-fit">
                            {item.category}
                          </span>
                          <p className="text-xs font-light leading-relaxed tracking-wide text-white/90 line-clamp-2">
                            {item.caption || 'Curated spacing detail.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

        {/* Prevent grid height shift due to architectural offsets */}
        <div className="h-12 hidden md:block" />

        {limit && items.length > limit && (
          <div className="text-center mt-4">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-ivory/25 hover:border-ivory text-ivory text-xs uppercase tracking-[0.2em] rounded-full transition-colors"
            >
              <span>View Full Gallery</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
        )}

      </div>

      {/* LUXURIOUS LIGHTBOX COMPONENT */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors duration-300 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors duration-300 cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-6 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-colors duration-300 cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>

            {/* Image & Detail Panel Frame */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 bg-[#FAF9F5] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking card
            >
              {/* Image Column */}
              <div className="col-span-1 md:col-span-8 relative aspect-[4/3] md:aspect-square w-full overflow-hidden bg-[#ECE6DE]">
                <Image
                  src={filteredItems[lightboxIndex].image_url}
                  alt={filteredItems[lightboxIndex].caption || 'Curated Detail'}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  priority
                />
              </div>

              {/* Detail Brief Column */}
              <div className="col-span-1 md:col-span-4 p-8 md:p-10 flex flex-col justify-between h-full bg-[#F5F2ED] text-[#1F1A17]">
                <div className="space-y-6">
                  <span className="text-xs uppercase tracking-[0.3em] text-[#6B5646] block">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <hr className="border-[#1F1A17]/10 w-16" />
                  <p className="text-2xl font-serif leading-snug text-[#1F1A17]/85">
                    {filteredItems[lightboxIndex].caption}
                  </p>
                </div>

                <div className="pt-8 border-t border-[#1C1B1A]/10 flex justify-between items-center text-xs text-[#1C1B1A]/40 uppercase tracking-widest">
                  <span>ITEM {lightboxIndex + 1} OF {filteredItems.length}</span>
                  <span>ETHEREAL SPACES</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
