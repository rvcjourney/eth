import type { Metadata } from 'next';
import { PROJECTS } from '@/lib/content';

// Every project page is built ahead of time from the content file; unknown project URLs return 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: 'Project' };

  return {
    title: `${project.name} — ${project.category}`,
    description: project.overview.slice(0, 160),
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { images: [project.hero_image] },
  };
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
