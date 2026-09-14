import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Tailored colour palettes, precise 2D drawings, ultra-realistic 3D renders and on-site execution, delivered end to end by Ethereal Spaces.',
  alternates: { canonical: '/services' },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
