import type { MetadataRoute } from 'next';
import { BRAND } from '@/lib/brand';
import { PROJECTS } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/projects', '/services', '/gallery', '/contact'].map((path) => ({
    url: `${BRAND.siteUrl}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const projects = PROJECTS.map((p) => ({
    url: `${BRAND.siteUrl}/projects/${p.slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...pages, ...projects];
}
