import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';
import { PROJECTS } from '@/lib/content';
import { BLOG_POSTS } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/projects', '/services', '/gallery', '/blog', '/contact'].map((path) => ({
    url: `${BRAND.siteUrl}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const projects = PROJECTS.map((p) => ({
    url: `${BRAND.siteUrl}/projects/${p.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  const posts = BLOG_POSTS.map((post) => ({
    url: `${BRAND.siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...pages, ...projects, ...posts];
}
