import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Completed homes and 3D visualisations: living and dining rooms, bedrooms, washrooms, restaurants and bars designed by Ethereal Spaces.',
  alternates: { canonical: '/projects' },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
