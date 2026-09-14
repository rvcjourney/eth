import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Ethereal Spaces is a Pune-based interior design studio: passionate creators of extraordinary environments, transforming spaces into timeless expressions of beauty, functionality and personal style.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
