import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'Interior Design Journal',
  description:
    'Practical guidance on interior design in Pune: choosing a studio, what shapes a quote, drawings and renders, colour palettes and turnkey execution.',
  alternates: { canonical: '/blog' },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default function BlogPage() {
  const [lead, ...rest] = BLOG_POSTS;

  return (
    <div className="min-h-screen pt-32 pb-24 bg-dark-bg text-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="space-y-4 mb-16 max-w-2xl">
          <span className="text-xs tracking-[0.3em] uppercase text-gold block">Journal</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.02]">
            Notes on Designing a Space
          </h1>
          <p className="text-base text-ivory/80 leading-relaxed font-light">
            What we have learned designing and building interiors in Pune, written for the people
            who have to make the decisions.
          </p>
        </div>

        {/* Lead article */}
        <Link
          href={`/blog/${lead.slug}`}
          className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-20 pb-20 border-b border-gold/10"
        >
          <div className="lg:col-span-7 relative aspect-[3/2] rounded-2xl overflow-hidden bg-dark-surface">
            <Image
              src={lead.image}
              alt={lead.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              quality={90}
              priority
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
          </div>
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">
              {formatDate(lead.date)} · {lead.readingMinutes} min read
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-tight group-hover:text-gold transition-colors duration-300">
              {lead.title}
            </h2>
            <p className="text-base text-ivory/80 leading-relaxed font-light">{lead.description}</p>
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-champagne group-hover:text-gold transition-colors pt-2">
              Read the article
              <ArrowUpRight size={14} />
            </span>
          </div>
        </Link>

        {/* The rest */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group space-y-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-dark-surface">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              </div>
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] text-gold block">
                  {post.readingMinutes} min read
                </span>
                <h2 className="text-xl md:text-2xl font-light tracking-tight leading-snug group-hover:text-gold transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-sm text-ivory/80 leading-relaxed font-light">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-28 p-8 md:p-20 bg-ivory text-dark-bg text-center rounded-2xl space-y-6">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">Planning Your Own Space?</h2>
          <p className="text-base text-dark-bg/80 max-w-md mx-auto leading-relaxed font-light">
            Tell us about it and we will guide you from the first palette to the final handover.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 sm:px-8 py-4 whitespace-nowrap bg-dark-bg hover:bg-dark-secondary text-ivory text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] rounded-full transition-colors duration-300"
            >
              Book a Free Consultation
            </Link>
            <a
              href={BRAND.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-4 whitespace-nowrap border border-dark-bg/30 hover:border-dark-bg text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} />
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
