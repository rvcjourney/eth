import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, MessageCircle } from 'lucide-react';
import { BLOG_POSTS, getPost } from '@/lib/blog';
import { BRAND } from '@/lib/brand';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: `${BRAND.siteUrl}${post.image}`,
    mainEntityOfPage: `${BRAND.siteUrl}/blog/${post.slug}`,
    author: { '@type': 'Organization', name: BRAND.legalName, url: BRAND.siteUrl },
    publisher: {
      '@type': 'Organization',
      name: BRAND.legalName,
      logo: { '@type': 'ImageObject', url: `${BRAND.siteUrl}/images/logo-dark.png` },
    },
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-dark-bg text-ivory">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-6 md:px-12">

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 py-3 text-xs uppercase tracking-[0.2em] text-champagne hover:text-gold transition-colors mb-10"
        >
          <ArrowLeft size={12} />
          <span>All Articles</span>
        </Link>

        <header className="space-y-5 mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-gold block">
            {formatDate(post.date)} · {post.readingMinutes} min read
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05]">{post.title}</h1>
        </header>

        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-dark-surface mb-14">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            quality={90}
            priority
            className="object-cover"
          />
        </div>

        <p className="text-lg md:text-xl text-ivory/90 leading-relaxed font-light mb-14">{post.intro}</p>

        <div className="space-y-12">
          {post.sections.map((section, i) => (
            <section key={section.heading ?? i} className="space-y-5">
              {section.heading && (
                <h2 className="text-2xl md:text-3xl font-light tracking-tight">{section.heading}</h2>
              )}
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 40)} className="text-base text-ivory/80 leading-relaxed font-light">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="space-y-3 pt-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base text-ivory/80 font-light">
                      <span className="w-1.5 h-1.5 mt-2.5 rounded-full bg-gold shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 md:p-12 bg-ivory text-dark-bg rounded-2xl space-y-5 text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">Planning a New Interior?</h2>
          <p className="text-base text-dark-bg/80 max-w-md mx-auto leading-relaxed font-light">
            Tell us about your space and we will guide you from the first palette to the final handover.
          </p>
          <div className="pt-3 flex flex-col sm:flex-row justify-center gap-4">
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
      </article>

      {/* More reading */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-28">
        <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-10">More From the Journal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {more.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-dark-surface">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  quality={90}
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-light leading-snug group-hover:text-gold transition-colors duration-300">
                {p.title}
              </h3>
              <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-champagne group-hover:text-gold transition-colors">
                Read
                <ArrowUpRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
