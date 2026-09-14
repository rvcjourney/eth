'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import SafeImage from '@/components/SafeImage';
import InteractiveGallery from '@/components/InteractiveGallery';
import SiteToHandover from '@/components/SiteToHandover';
import { HOMEPAGE_CONTENT, PROJECTS, COMPLETED_LABEL } from '@/lib/content';
import { BRAND } from '@/lib/brand';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const PROCESS_STEP_MS = 5000;

export default function HomePage() {
  const content = HOMEPAGE_CONTENT;
  const projects = PROJECTS;
  const [activeStep, setActiveStep] = useState(0);
  const [processPaused, setProcessPaused] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);

  // Process steps advance on their own while the section is on screen; hovering or focusing pauses them,
  // and choosing a step restarts the timer from that step.
  const processRef = useRef<HTMLElement>(null);
  const processInView = useInView(processRef, { amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const stepCount = content.design_process.length;
  const processAutoplay = processInView && !processPaused && !prefersReducedMotion && stepCount > 1;

  useEffect(() => {
    if (!processAutoplay) return;
    const timer = setTimeout(() => setActiveStep((step) => (step + 1) % stepCount), PROCESS_STEP_MS);
    return () => clearTimeout(timer);
  }, [processAutoplay, activeStep, stepCount]);

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], [0, -60]);

  const featured = projects.slice(0, 3);
  const completed = projects.filter((p) => p.location === COMPLETED_LABEL);
  const showcase = completed.length > 0 ? completed : featured;
  const current = showcase[activeProject % showcase.length];
  const processStep = content.design_process[activeStep] ?? content.design_process[0];

  const goToProject = (next: number) => {
    setSlideDirection(next > activeProject ? 1 : -1);
    setActiveProject((next + showcase.length) % showcase.length);
  };

  const heroWords = content.hero_title.split(' ');

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
  };
  const staggerItem = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } }
  };
  const wordContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
  };
  const wordReveal = {
    hidden: { y: '100%' },
    visible: { y: 0, transition: { duration: 0.8, ease: EASE } }
  };
  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
    exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: 0.6, ease: EASE } })
  };

  return (
    <div className="relative overflow-hidden">

      {/* 1. HERO */}
      <section className="relative min-h-screen w-full flex items-center justify-center bg-dark-bg overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* initial={false}: hero copy is fully visible on first paint, never waiting on JS to fade in. */}
          <motion.div
            variants={staggerContainer}
            initial={false}
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center space-y-8 z-10"
          >
            <div className="space-y-5">
              <motion.span variants={staggerItem} className="text-[12px] tracking-[0.4em] uppercase text-gold font-medium block">
                {BRAND.legalName} · {BRAND.city}
              </motion.span>

              <motion.h1 variants={wordContainer} className="text-5xl md:text-7xl xl:text-8xl font-light tracking-tight text-ivory leading-[1.02] flex flex-wrap">
                {heroWords.map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block mr-3 md:mr-5 py-1">
                    <motion.span
                      variants={wordReveal}
                      className={`inline-block ${i === heroWords.length - 1 ? 'text-gold italic' : ''}`}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>
            </div>

            <motion.p variants={staggerItem} className="text-sm md:text-base font-light text-ivory/80 max-w-xl leading-relaxed">
              {content.hero_subtitle}
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/projects"
                className="px-8 py-4 bg-ivory hover:bg-gold text-dark-bg text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 rounded-full text-center"
              >
                Explore Projects
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-ivory/25 hover:border-ivory/60 text-ivory text-xs uppercase tracking-[0.2em] transition-colors duration-300 rounded-full text-center"
              >
                Start Your Project
              </Link>
            </motion.div>

            <motion.ul variants={staggerItem} className="flex flex-wrap gap-x-6 gap-y-2 pt-4 text-xs uppercase tracking-[0.2em] text-champagne">
              {['Colour Palettes', '2D Drawings', '3D Renders', 'Site Execution'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <div className="lg:col-span-5 relative w-full flex justify-center items-center z-10">
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[3/4] w-full max-w-md lg:max-w-none rounded-t-[999px] rounded-b-2xl overflow-hidden bg-dark-surface shadow-[0_30px_60px_rgba(31,26,23,0.12)]"
            >
              <SafeImage
                src={content.hero_image}
                alt="Completed living room by Ethereal Spaces"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROJECTS */}
      <section className="pt-16 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-4">
            <span className="text-xs tracking-[0.3em] uppercase text-gold">{content.portfolio_tag || 'Portfolio'}</span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-ivory">{content.portfolio_title || 'Featured Projects'}</h2>
          </div>
          <Link
            href="/projects"
            className="text-xs uppercase tracking-[0.2em] text-champagne hover:text-gold flex items-center gap-1.5 transition-colors mt-4 md:mt-0 group"
          >
            <span>{content.portfolio_link_text || 'View All Projects'}</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((project, idx) => (
            <motion.div
              initial={{ y: 35 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              key={project.id}
              className={`group relative overflow-hidden rounded-2xl ${idx === 1 ? 'md:translate-y-12' : ''}`}
            >
              <Link href={`/projects/${project.slug}`} className="block relative aspect-[4/5] overflow-hidden rounded-2xl bg-dark-surface">
                <SafeImage
                  src={project.hero_image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/80 mb-2">{project.category} · {project.location}</span>
                  <h3 className="text-3xl font-light text-white tracking-wide">{project.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-white/90 uppercase tracking-[0.2em] mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span>View Project</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. ABOUT & WHAT WE DELIVER */}
      <section className="bg-dark-surface py-32 border-t border-b border-gold/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -25 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-xs tracking-[0.3em] uppercase text-gold">{content.distinction_tag || 'About Us'}</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight text-ivory leading-[1.05]">
                {content.distinction_title}
              </h2>
            </div>
            <p className="text-sm md:text-base font-light text-ivory/80 leading-relaxed max-w-lg">
              {content.distinction_text}
            </p>
            <div className="border-l border-gold/40 pl-6 space-y-1">
              <p className="text-xs text-gold uppercase tracking-[0.25em] font-medium">{content.distinction_badge_title}</p>
              <p className="text-sm text-ivory/80 font-light">{content.distinction_badge_desc}</p>
            </div>
            <Link href="/services" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ivory hover:text-gold transition-colors group">
              <span>Our Services</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {content.why_choose_us.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 25 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.12 }}
                className="p-8 bg-dark-bg border border-gold/10 hover:border-gold/25 rounded-2xl transition-colors duration-500"
              >
                <span className="text-4xl font-serif text-gold/40 block mb-6">0{idx + 1}</span>
                <h3 className="text-2xl font-light text-ivory mb-3">{card.title}</h3>
                <p className="text-sm text-ivory/75 leading-relaxed font-light">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SITE TO HANDOVER */}
      <SiteToHandover />

      {/* 5. PROCESS */}
      <section
        ref={processRef}
        onMouseEnter={() => setProcessPaused(true)}
        onMouseLeave={() => setProcessPaused(false)}
        onFocus={() => setProcessPaused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setProcessPaused(false);
        }}
        className="py-32 px-6 md:px-12 bg-dark-surface border-t border-b border-gold/10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-gold">{content.methodology_tag || 'Our Process'}</span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-ivory">{content.methodology_title}</h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mb-12" role="tablist" aria-label="Design process steps">
            {content.design_process.map((step, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={activeStep === idx}
                aria-controls="process-step-panel"
                onClick={() => setActiveStep(idx)}
                className="flex items-center gap-2.5 group py-2 px-1 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <span
                  className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-colors duration-500 ${
                    activeStep === idx ? 'border-gold bg-gold text-dark-bg' : 'border-gold/40 text-gold group-hover:border-gold group-hover:bg-gold/10'
                  }`}
                >
                  {step.step}
                </span>
                <span className={`text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${activeStep === idx ? 'text-ivory font-medium' : 'text-ivory/80 group-hover:text-gold'}`}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          <div
            id="process-step-panel"
            role="tabpanel"
            className="relative overflow-hidden bg-dark-bg p-8 md:p-16 rounded-2xl border border-gold/10 max-w-4xl mx-auto min-h-[240px] flex items-center"
          >
            {/* Progress towards the next step; restarts from zero whenever the step changes or autoplay resumes. */}
            <div className="absolute left-0 bottom-0 h-[3px] w-full bg-gold/10" aria-hidden="true">
              {processAutoplay && (
                <div
                  key={activeStep}
                  className="h-full w-full bg-gold origin-left"
                  style={{ animation: `step-progress ${PROCESS_STEP_MS}ms linear forwards` }}
                />
              )}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full"
              >
                <div className="md:col-span-3">
                  <span className="text-6xl md:text-8xl font-serif text-gold/40 block [font-variant-numeric:lining-nums]">0{processStep.step}</span>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <h3 className="text-3xl md:text-4xl font-light text-ivory">{processStep.title}</h3>
                  <p className="text-sm md:text-base font-light text-ivory/80 leading-relaxed">{processStep.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 6. COMPLETED PROJECTS SHOWCASE */}
      {current && (
        <section className="py-32 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
            <div className="space-y-4">
              <span className="text-xs tracking-[0.3em] uppercase text-gold">{content.showcase_tag || 'Completed Projects'}</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight text-ivory">{content.showcase_title}</h2>
            </div>

            <div className="relative w-full max-w-6xl mx-auto aspect-[4/3] md:aspect-[21/9] rounded-2xl overflow-hidden bg-dark-surface">
              <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                <motion.div
                  key={current.id}
                  custom={slideDirection}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full"
                >
                  <SafeImage src={current.hero_image} alt={current.name} fill sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white text-left">
                    <div className="space-y-2">
                      <span className="text-xs uppercase tracking-[0.25em] text-white/75">{current.category}</span>
                      <h3 className="text-3xl md:text-5xl font-light">{current.name}</h3>
                    </div>
                    <Link
                      href={`/projects/${current.slug}`}
                      className="px-6 py-3 bg-white text-black hover:bg-dark-surface text-xs uppercase tracking-widest rounded-full transition-colors duration-300 w-fit flex items-center gap-1.5"
                    >
                      <span>View Project</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center items-center gap-6">
              <button
                onClick={() => goToProject(activeProject - 1)}
                className="w-11 h-11 rounded-full border border-gold/25 flex items-center justify-center text-gold hover:border-gold transition-colors duration-300"
                aria-label="Previous project"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="flex gap-2">
                {showcase.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => goToProject(idx)}
                    aria-label={`Show ${p.name}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${activeProject % showcase.length === idx ? 'bg-gold w-6' : 'bg-gold/25 w-1.5'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => goToProject(activeProject + 1)}
                className="w-11 h-11 rounded-full border border-gold/25 flex items-center justify-center text-gold hover:border-gold transition-colors duration-300"
                aria-label="Next project"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 7. STUDIO ARCHIVE */}
      <InteractiveGallery
        tag={content.gallery_tag}
        title={content.gallery_title}
        description={content.gallery_description}
        limit={8}
      />

      {/* 8. CALL TO ACTION */}
      <section className="relative py-40 overflow-hidden flex items-center justify-center bg-ivory">
        <SafeImage src="/images/portfolio/hero/cover.jpg" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/60 to-ivory/90" />

        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-3xl px-6 space-y-8"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-dark-secondary block">{content.cta_tag || 'Consultation'}</span>
          <h2 className="text-4xl md:text-7xl font-light tracking-tight text-dark-bg">{content.cta_title}</h2>
          <p className="text-sm md:text-base font-light text-dark-bg/80 max-w-lg mx-auto leading-relaxed">{content.cta_description}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-10 py-4 bg-dark-bg hover:bg-dark-secondary text-ivory text-xs uppercase tracking-[0.25em] transition-colors duration-300 rounded-full"
            >
              {content.cta_button_text}
            </Link>
            <a
              href={BRAND.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 border border-dark-bg/30 hover:border-dark-bg text-dark-bg text-xs uppercase tracking-[0.25em] transition-colors duration-300 rounded-full flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} />
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
