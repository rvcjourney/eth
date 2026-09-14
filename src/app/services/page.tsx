import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { BRAND } from '@/lib/brand';

const services = [
  {
    eyebrow: '01 — Colour & Material',
    title: 'Tailored Colour Palettes',
    image: '/images/portfolio/materials/01.jpg',
    imageAlt: 'Textured plaster material sample',
    description: 'We carefully select the perfect colour palette for each client, ensuring harmony with their lifestyle, personality, and space. Every detail is customised to create a unique atmosphere that reflects individuality.',
    details: ['Palette matched to your lifestyle and personality', 'Finish selection: plaster, stone, wood and metal', 'Warm tones with refined contrasts']
  },
  {
    eyebrow: '02 — Technical Planning',
    title: '2D Drawings',
    image: '/images/portfolio/drawings/bedroom-elevation.jpg',
    imageAlt: 'Bedroom elevation and plan drawing with material and lighting schedules',
    description: 'Exceptional interiors are not created by chance; they are meticulously planned. Our detailed 2D drawings embody precision, technical expertise, and thoughtful planning, ensuring every space is executed with uncompromising accuracy and timeless elegance.',
    details: ['Floor plans and furniture layouts', 'Wall elevations with dimensions', 'Door, joinery and washroom details', 'Material, finish and lighting schedules']
  },
  {
    eyebrow: '03 — Visualisation',
    title: '3D Renders',
    image: '/images/portfolio/opulence-and-elegance/01.jpg',
    imageAlt: '3D render of a living and dining space with marble flooring',
    description: 'Every extraordinary interior deserves to be experienced before it is created. Our ultra-realistic 3D visualisations blend creativity, precision, and architectural detail, offering an immersive journey through your future space with exceptional clarity.',
    details: ['Ultra-realistic visualisations', 'Living, bedroom, washroom and hospitality spaces', 'Refine materials and lighting before work begins']
  },
  {
    eyebrow: '04 — Execution',
    title: 'On-Site Execution',
    image: '/images/portfolio/site-work/09.jpg',
    imageAlt: 'Balcony with slatted ceiling and spot lights during site work',
    description: 'A design is only as good as its execution. We stay involved on site through false ceilings, carpentry, joinery and finishes, so that what gets built matches what was drawn, all the way to handover.',
    details: ['False ceilings and lighting', 'Custom carpentry and wardrobes', 'Finishes and detailing', 'Handover of the completed space']
  }
];

const spaces = [
  { group: 'Residential', items: ['Living & dining rooms', 'Bedrooms & wardrobes', 'Kitchens', 'Washrooms', 'Pooja units', 'Entrances & foyers'] },
  { group: 'Hospitality & Commercial', items: ['Restaurants & cafés', 'Bars & lounges', 'Rooftop dining', 'Offices'] }
];

const siteWork = ['01', '03', '05', '07', '10', '11'];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-dark-bg text-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="space-y-4 mb-24 max-w-2xl">
          <span className="text-xs tracking-[0.3em] uppercase text-gold block">Our Services</span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.02]">From Palette to Handover</h1>
          <p className="text-base text-ivory/80 leading-relaxed font-light">
            One studio for every stage of your interior: the colours and materials, the technical drawings, the 3D visualisation, and the work on site.
          </p>
        </div>

        <div className="space-y-28">
          {services.map((srv, idx) => (
            <article key={srv.title} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className={`lg:col-span-7 relative aspect-[3/2] rounded-2xl overflow-hidden bg-dark-surface ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Image src={srv.image} alt={srv.imageAlt} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              </div>
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs uppercase tracking-[0.3em] text-gold">{srv.eyebrow}</span>
                <h2 className="text-4xl md:text-5xl font-light tracking-tight">{srv.title}</h2>
                <p className="text-base text-ivory/80 leading-relaxed font-light">{srv.description}</p>
                <ul className="space-y-3 pt-4 border-t border-gold/10">
                  {srv.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3 text-sm text-ivory/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        {/* Spaces we design */}
        <section className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaces.map((space) => (
            <div key={space.group} className="p-10 bg-dark-surface rounded-2xl border border-gold/10 space-y-6">
              <h3 className="text-3xl font-light">{space.group}</h3>
              <ul className="grid grid-cols-2 gap-3 text-sm text-ivory/80">
                {space.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Ongoing site work */}
        <section className="mt-32 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4 max-w-xl">
              <span className="text-xs tracking-[0.3em] uppercase text-gold block">Ongoing Site Work</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight">Behind the Finish</h2>
              <p className="text-base text-ivory/80 font-light leading-relaxed">
                Ceilings, carpentry and joinery in progress on our active sites.
              </p>
            </div>
            <Link href="/gallery" className="text-xs uppercase tracking-[0.2em] text-champagne hover:text-gold flex items-center gap-1.5 transition-colors">
              <span>Full Gallery</span>
              <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {siteWork.map((n) => (
              <div key={n} className="relative aspect-[9/16] rounded-xl overflow-hidden bg-dark-surface">
                <Image src={`/images/portfolio/site-work/${n}.jpg`} alt="Ethereal Spaces site work in progress" fill sizes="(max-width: 768px) 50vw, 16vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-32 p-12 md:p-20 bg-ivory text-dark-bg text-center rounded-2xl space-y-6">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight">Planning a New Interior?</h2>
          <p className="text-base text-dark-bg/80 max-w-md mx-auto leading-relaxed font-light">
            Tell us about your space and we will guide you from the first palette to the final handover.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="px-8 py-4 bg-dark-bg hover:bg-dark-secondary text-ivory text-xs uppercase tracking-[0.2em] rounded-full transition-colors duration-300">
              Book a Consultation
            </Link>
            <a href={BRAND.whatsappHref} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-dark-bg/30 hover:border-dark-bg text-xs uppercase tracking-[0.2em] rounded-full transition-colors duration-300 flex items-center justify-center gap-2">
              <MessageCircle size={14} />
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
