'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, MessageCircle, X } from 'lucide-react';
import { PROJECTS, RENDER_LABEL } from '@/lib/content';
import { BRAND } from '@/lib/brand';

export default function ProjectDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;

  const project = PROJECTS.find((p) => p.slug === slug);
  const others = PROJECTS.filter((p) => p.slug !== slug);
  // Prefer projects from the same category, then fill with the rest.
  const related = [
    ...others.filter((p) => p.category === project?.category),
    ...others.filter((p) => p.category !== project?.category),
  ].slice(0, 2);

  const [sliderPosition, setSliderPosition] = useState(50);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);

  const images = project?.images?.length ? project.images : project ? [project.hero_image] : [];

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') setActiveImageIndex((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setActiveImageIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLightboxOpen, images.length]);

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    setSliderPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };

  if (!project) notFound();

  const isRender = project.location === RENDER_LABEL;
  const hasCaseStudy = Boolean(project.design_challenge && project.design_solution);
  const hasComparison = Boolean(project.before_image);
  const afterImage = project.after_image || project.hero_image;

  return (
    <div className="min-h-screen bg-dark-bg text-ivory pb-24">

      {/* 1. HERO */}
      <section className="relative h-[75vh] min-h-[520px] w-full overflow-hidden">
        <Image src={project.hero_image} alt={project.name} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

        <div className="absolute top-28 left-6 md:left-12 z-10">
          <Link href="/projects" className="flex items-center gap-2 py-3 text-xs uppercase tracking-[0.2em] text-white/85 hover:text-white transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>All Projects</span>
          </Link>
        </div>

        <div className="absolute bottom-12 left-6 md:left-12 right-6 max-w-4xl space-y-4">
          <span className="text-xs tracking-[0.3em] uppercase text-white/80">{project.category} · {project.location}</span>
          <h1 className="text-5xl md:text-8xl font-light tracking-tight text-white leading-[1]">{project.name}</h1>
          {project.completion_date && (
            <p className="text-sm text-white/70 font-light">Completed {project.completion_date}</p>
          )}
        </div>
      </section>

      {/* 2. STORY & DETAILS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">

        <div className="lg:col-span-8 space-y-14">
          <div className="space-y-5">
            <h2 className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium">The Design</h2>
            <p className="text-2xl md:text-3xl font-serif text-ivory/90 leading-snug">{project.overview}</p>
          </div>

          {hasCaseStudy && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 border-l border-gold/20 pl-6">
                <h3 className="text-xs uppercase tracking-[0.2em] text-champagne font-sans font-medium">The Challenge</h3>
                <p className="text-sm font-light text-ivory/80 leading-relaxed">{project.design_challenge}</p>
              </div>
              <div className="space-y-4 border-l border-gold/20 pl-6">
                <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium">The Solution</h3>
                <p className="text-sm font-light text-ivory/80 leading-relaxed">{project.design_solution}</p>
              </div>
            </div>
          )}

          {hasComparison && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium mb-1">On Site → Handover</h3>
                <p className="text-sm text-ivory/80">Drag across the image to compare the room during execution and after completion.</p>
              </div>

              <div
                ref={sliderRef}
                onMouseMove={(e) => handleMove(e.clientX)}
                onTouchMove={(e) => e.touches.length > 0 && handleMove(e.touches[0].clientX)}
                className="relative h-[420px] md:h-[520px] w-full overflow-hidden select-none cursor-ew-resize rounded-2xl"
              >
                <Image src={afterImage} alt={`${project.name} after completion`} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" draggable={false} />
                <span className="absolute right-4 bottom-4 z-10 bg-black/60 px-3 py-1 rounded-full text-xs uppercase tracking-widest text-white">Handover</span>

                <div className="absolute inset-0" style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}>
                  <Image src={project.before_image!} alt={`${project.name} during site work`} fill sizes="(max-width: 1024px) 100vw, 66vw" className="object-cover" draggable={false} />
                  <span className="absolute left-4 bottom-4 z-10 bg-black/60 px-3 py-1 rounded-full text-xs uppercase tracking-widest text-white">On Site</span>
                </div>

                <div className="absolute top-0 bottom-0 w-[1px] bg-white z-20" style={{ left: `${sliderPosition}%` }}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white bg-black/40 backdrop-blur flex items-center justify-center text-white text-xs">
                    ‹ ›
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="p-8 bg-dark-surface rounded-2xl space-y-6">
            <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium">Design Palette</h3>
            <div className="flex flex-wrap gap-2">
              {project.materials.map((mat) => (
                <span key={mat} className="px-3 py-1.5 bg-dark-bg border border-gold/15 text-xs tracking-wide text-ivory/80 rounded-full">
                  {mat}
                </span>
              ))}
            </div>
            {isRender && (
              <p className="text-xs text-ivory/80 leading-relaxed border-t border-gold/10 pt-4">
                3D visualisation. Actual colours and finishes may vary on site.
              </p>
            )}
          </div>

          {project.client_testimonial && (
            <div className="p-8 border border-gold/15 rounded-2xl space-y-5">
              <h3 className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium">Client Words</h3>
              <p className="text-xl font-serif italic text-ivory/85 leading-snug">&ldquo;{project.client_testimonial}&rdquo;</p>
              {project.client_name && <p className="text-xs uppercase tracking-wider text-ivory/75">{project.client_name}</p>}
            </div>
          )}

          <div className="p-8 bg-ivory text-dark-bg rounded-2xl space-y-5">
            <h3 className="text-3xl font-light">Planning a similar space?</h3>
            <p className="text-sm text-dark-bg/80 font-light leading-relaxed">Share your plans and we will help shape a design that is truly yours.</p>
            <div className="flex flex-col gap-3">
              <Link href="/contact" className="px-6 py-3 bg-dark-bg text-ivory text-xs uppercase tracking-[0.2em] rounded-full text-center hover:bg-dark-secondary transition-colors">
                Book a Free Consultation
              </Link>
              <a href={BRAND.whatsappHref} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-dark-bg/30 hover:border-dark-bg text-xs uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-2 transition-colors">
                <MessageCircle size={14} />
                WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </section>

      {/* 3. IMAGE GALLERY */}
      {images.length > 0 && (
        <section className="py-20 border-t border-gold/10 bg-dark-surface/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium mb-10 text-center">Project Images</h3>

            <div className="relative aspect-[4/3] md:aspect-[16/9] max-w-5xl mx-auto mb-6 rounded-2xl overflow-hidden bg-dark-surface group">
              <Image src={images[activeImageIndex]} alt={`${project.name}, image ${activeImageIndex + 1}`} fill sizes="(max-width: 1280px) 100vw, 1024px" className="object-contain" />
              <button
                onClick={() => setIsLightboxOpen(true)}
                aria-label="View full screen"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-dark-bg/85 flex items-center justify-center text-ivory opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              >
                <Maximize2 size={16} />
              </button>
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-bg/85 flex items-center justify-center text-ivory hover:text-gold transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-bg/85 flex items-center justify-center text-ivory hover:text-gold transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex md:justify-center items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`Show image ${idx + 1}`}
                    className={`relative w-24 shrink-0 aspect-[4/3] overflow-hidden rounded-lg border transition-all duration-300 ${
                      activeImageIndex === idx ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="96px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* LIGHTBOX */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col justify-center items-center p-6" onClick={() => setIsLightboxOpen(false)}>
          <button
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close"
            className="absolute top-6 right-6 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10"
          >
            <X size={18} />
          </button>
          <div className="relative w-full max-w-6xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={images[activeImageIndex]} alt={`${project.name}, image ${activeImageIndex + 1}`} fill sizes="100vw" className="object-contain" />
          </div>
          <span className="text-xs text-white/75 uppercase tracking-widest mt-6">
            {activeImageIndex + 1} / {images.length}
          </span>
        </div>
      )}

      {/* 4. RELATED */}
      {related.length > 0 && (
        <section className="py-24 border-t border-gold/10 max-w-7xl mx-auto px-6 md:px-12">
          <h3 className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium mb-10">More Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((item) => (
              <Link href={`/projects/${item.slug}`} key={item.id} className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-dark-surface block">
                <Image src={item.hero_image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/80 mb-1">{item.category} · {item.location}</span>
                  <h4 className="text-3xl font-light flex items-center gap-2">
                    {item.name}
                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
