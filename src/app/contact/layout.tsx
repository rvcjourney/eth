import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Call or WhatsApp +91 84858 57626 or email spaces.ethereal@gmail.com to book a consultation with Ethereal Spaces, interior designers in Pune.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
