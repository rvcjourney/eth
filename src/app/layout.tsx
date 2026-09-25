import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AutoContactPopup from "@/components/AutoContactPopup";
import FloatingContact from "@/components/FloatingContact";
import Analytics from "@/components/Analytics";
import { BRAND } from "@/lib/brand";

// Only 400+ weights are loaded, so `font-light` headings render at a readable 400.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Ethereal Spaces is a Pune-based interior design studio creating timeless interiors with tailored colour palettes, precise 2D drawings, ultra-realistic 3D renders and on-site execution for homes, washrooms and hospitality spaces.";

export const metadata: Metadata = {
  title: {
    template: "%s | Ethereal Spaces",
    default: "Ethereal Spaces | Interior Design Studio in Pune — Elegance Redefined",
  },
  description,
  keywords: ["Interior Designer in Pune", "Interior Design Studio Pune", "Luxury Interior Design Pune", "Residential Interior Design", "3D Interior Renders", "2D Interior Drawings", "Turnkey Interiors", "Restaurant Interior Design"],
  metadataBase: new URL(BRAND.siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ethereal Spaces | Elegance Redefined, Spaces Reimagined",
    description,
    type: "website",
    locale: "en_IN",
    siteName: "Ethereal Spaces",
    images: [{ url: "/images/portfolio/opulence-and-elegance/01.jpg", width: 1350, height: 760, alt: "Living and dining interior by Ethereal Spaces" }],
  },
  twitter: { card: "summary_large_image" },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: BRAND.legalName,
  alternateName: BRAND.name,
  slogan: BRAND.tagline,
  description,
  url: BRAND.siteUrl,
  telephone: BRAND.phoneHref.replace("tel:", ""),
  email: BRAND.email,
  logo: `${BRAND.siteUrl}/images/logo-dark.png`,
  image: `${BRAND.siteUrl}/images/portfolio/hero/home.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: BRAND.city,
    addressRegion: BRAND.region,
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "City", name: BRAND.city },
    ...BRAND.serviceAreas.map((area) => ({ "@type": "Place", name: `${area}, ${BRAND.city}` })),
  ],
  sameAs: Object.values(BRAND.social).filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        {/* Analytics must sit in <head>: Search Console's ownership check looks nowhere else. */}
        <Analytics />
      </head>
      <body className="antialiased bg-dark-bg text-ivory min-h-screen flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <AutoContactPopup />
      </body>
    </html>
  );
}
