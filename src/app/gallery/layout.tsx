import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Completed details, 3D renders, 2D drawings and site-work photographs from Ethereal Spaces projects.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
