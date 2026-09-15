// Website content for Ethereal Spaces, taken from the studio portfolio (2026).
// There is no database: edit this file and redeploy to change what the website shows.
// Images live in /public/images/portfolio.

export interface HomepageContent {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image: string;
  why_choose_us: Array<{ title: string; description: string }>;
  design_process: Array<{ step: number; title: string; description: string }>;
  cta_title: string;
  cta_button_text: string;
  
  // New Configurable Fields
  portfolio_tag?: string;
  portfolio_title?: string;
  portfolio_link_text?: string;
  distinction_tag?: string;
  distinction_title?: string;
  distinction_text?: string;
  distinction_badge_title?: string;
  distinction_badge_desc?: string;
  methodology_tag?: string;
  methodology_title?: string;
  showcase_tag?: string;
  showcase_title?: string;
  cta_tag?: string;
  cta_description?: string;
  gallery_tag?: string;
  gallery_title?: string;
  gallery_description?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: string;
  location: string;
  hero_image: string;
  overview: string;
  design_challenge: string;
  design_solution: string;
  materials: string[];
  client_name?: string;
  client_testimonial?: string;
  completion_date?: string;
  images?: string[]; // array of image urls
  before_image?: string;
  after_image?: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  category: string;
  caption?: string;
  width: number;
  height: number;
}

export interface FormField {
  id: string;
  label: string;
  field_type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  is_required: boolean;
  options: string[];
  sort_order: number;
  is_active: boolean;
}

export interface StudioSettings {
  id: string;
  address: string;
  phone: string;
  email: string;
  hours_weekday: string;
  hours_weekday_time: string;
  hours_weekend: string;
  hours_weekend_time: string;
  about_text: string;
  privacy_policy?: string;
  terms_of_service?: string;
}

const img = (slug: string, n: number) => `/images/portfolio/${slug}/${String(n).padStart(2, '0')}.jpg`;
const imageSet = (slug: string, count: number) => Array.from({ length: count }, (_, i) => img(slug, i + 1));

export const RENDER_LABEL = '3D Visualisation';
export const COMPLETED_LABEL = 'Completed Project';

export const HOMEPAGE_CONTENT: HomepageContent = {
  id: 'default',
  hero_title: 'Elegance Redefined, Spaces Reimagined',
  hero_subtitle: 'We transform spaces into timeless expressions of beauty, functionality and personal style — from tailored colour palettes and precise 2D drawings to ultra-realistic 3D renders and on-site execution.',
  hero_image: '/images/portfolio/hero/home.jpg',
  why_choose_us: [
    { title: 'Tailored Colour Palettes', description: 'Every palette is selected for you, in harmony with your lifestyle, personality and space, so the atmosphere reflects who you are.' },
    { title: 'Precise 2D Drawings', description: 'Elevations, floor plans, door and washroom details with dimensions, finishes and lighting specified, so every space is executed accurately.' },
    { title: 'Ultra-Realistic 3D Renders', description: 'Experience your interior before it is built, with visualisations that capture materials, light and architectural detail.' },
    { title: 'On-Site Execution', description: 'We stay on site through false ceilings, carpentry and finishes, carrying the design from the drawing board to handover.' }
  ],
  design_process: [
    { step: 1, title: 'Listen & Understand', description: 'We listen to how you live and what you love, and translate your vision and functional needs into a clear design brief.' },
    { step: 2, title: 'Colour & Material Palette', description: 'A tailored palette of finishes (textured plaster, stone, wood, metal) chosen to suit your space and your personality.' },
    { step: 3, title: '2D Drawings', description: 'Detailed elevations, floor plans and joinery drawings with dimensions, materials, finishes and lighting specified.' },
    { step: 4, title: '3D Visualisation', description: 'Ultra-realistic renders that let you walk through your future space and refine it before work begins.' },
    { step: 5, title: 'Execution & Handover', description: 'On-site supervision through ceilings, carpentry and finishes, until your space is complete and ready to live in.' }
  ],
  cta_title: "Let's Reimagine Your Space",
  cta_button_text: 'Book a Free Consultation',
  portfolio_tag: 'Portfolio',
  portfolio_title: 'Featured Projects',
  portfolio_link_text: 'View All Projects',
  distinction_tag: 'About Us',
  distinction_title: 'Design That Enhances Everyday Living',
  distinction_text: 'We listen, we understand, and we translate dreams into tangible realities that exceed expectations. Through meticulous attention to detail, innovative solutions, and an unwavering commitment to excellence, we create spaces that are not just beautiful, but truly meaningful.',
  distinction_badge_title: 'Drawings · Renders · Execution',
  distinction_badge_desc: 'One studio, from the first sketch to the final handover',
  methodology_tag: 'Our Process',
  methodology_title: 'From Vision to Handover',
  showcase_tag: 'Completed Projects',
  showcase_title: 'Built, Not Just Rendered',
  cta_tag: 'Consultation',
  cta_description: 'Share your space, your style and your plans. We will help you shape a design that is beautiful, functional and truly yours.',
  gallery_tag: 'Studio Archive',
  gallery_title: 'Curated Details',
  gallery_description: 'Completed details, 3D renders, technical drawings and moments from site. The craft behind every Ethereal Spaces interior.'
};

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    slug: 'opulence-and-elegance',
    name: 'Opulence & Elegance',
    category: 'Living & Dining',
    location: RENDER_LABEL,
    hero_image: img('opulence-and-elegance', 1),
    overview: 'Luxury interior featuring an open living and dining space. The design blends warm wood panelling, marble flooring, and soft neutral tones with gold accents and ambient cove lighting to create an elegant yet welcoming atmosphere.',
    design_challenge: '',
    design_solution: '',
    materials: ['Warm wood panelling', 'Marble flooring', 'Gold accents', 'Ambient cove lighting'],
    images: imageSet('opulence-and-elegance', 3)
  },
  {
    id: 'p2',
    slug: 'linear-light-residence',
    name: 'The Linear Light Residence',
    category: 'Completed Homes',
    location: COMPLETED_LABEL,
    hero_image: img('linear-light-residence', 1),
    overview: 'A completed home where linear ceiling lighting, a marble-finish TV wall and warm cove lighting come together in a calm, contemporary palette. Photographed alongside the same rooms during execution, from bare ceilings and open carpentry to the finished living room and kitchen.',
    design_challenge: '',
    design_solution: '',
    materials: ['Marble-finish wall panel', 'Linear & cove lighting', 'High-gloss kitchen shutters', 'Fluted glass cabinets'],
    before_image: '/images/portfolio/linear-light-residence/before-living.jpg',
    after_image: img('linear-light-residence', 1),
    images: imageSet('linear-light-residence', 7)
  },
  {
    id: 'p3',
    slug: 'minimal-yet-cozy',
    name: 'Minimal Yet Cozy',
    category: 'Bedroom',
    location: RENDER_LABEL,
    hero_image: img('minimal-yet-cozy', 1),
    overview: 'A serene contemporary bedroom designed with a soft neutral palette, clean lines, and subtle organic accents to create a calm and luxurious atmosphere. The statement upholstered headboard with botanical detailing, warm wood finishes, and layered lighting bring depth and elegance, while minimalist furniture and thoughtfully curated décor ensure a timeless, clutter-free aesthetic focused on comfort and sophistication.',
    design_challenge: '',
    design_solution: '',
    materials: ['Upholstered headboard', 'Botanical detailing', 'Warm wood finishes', 'Layered lighting'],
    images: imageSet('minimal-yet-cozy', 3)
  },
  {
    id: 'p4',
    slug: 'pace-and-balance',
    name: 'Pace & Balance',
    category: 'Hospitality',
    location: RENDER_LABEL,
    hero_image: img('pace-and-balance', 1),
    overview: 'The Elegant Drink. The design is born from clean geometry, deep tones, and subtle light, with every detail crafted to highlight stillness and refinement. The atmosphere creates a dialogue between light and shadow, where calmness and sophistication merge into timeless harmony.',
    design_challenge: '',
    design_solution: '',
    materials: ['Clean geometry', 'Deep tones', 'Subtle light', 'Terrazzo bar counter'],
    images: imageSet('pace-and-balance', 4)
  },
  {
    id: 'p5',
    slug: 'marble-and-walnut-home',
    name: 'The Marble & Walnut Home',
    category: 'Completed Homes',
    location: COMPLETED_LABEL,
    hero_image: img('marble-and-walnut-home', 1),
    overview: 'A completed home anchored by a marble-finish TV wall with a fluted accent, a backlit walnut-finish pooja unit with arched display niches, and a custom wardrobe with an illuminated mirror.',
    design_challenge: '',
    design_solution: '',
    materials: ['Marble-finish panels', 'Walnut-finish laminates', 'Backlit display niches', 'Brass hardware'],
    images: imageSet('marble-and-walnut-home', 5)
  },
  {
    id: 'p6',
    slug: 'timeless-warmth',
    name: 'Timeless Warmth',
    category: 'Bedroom',
    location: RENDER_LABEL,
    hero_image: img('timeless-warmth', 3),
    overview: 'A warm contemporary bedroom that blends rich wood textures with soft neutral tones to create a refined and inviting retreat. Clean-lined furniture, seamless storage, ambient cove lighting, and a minimalist TV unit enhance both functionality and elegance, while subtle décor elements add depth and sophistication.',
    design_challenge: '',
    design_solution: '',
    materials: ['Rich wood textures', 'Soft neutral tones', 'Seamless storage', 'Ambient cove lighting'],
    images: [img('timeless-warmth', 3), img('timeless-warmth', 1), img('timeless-warmth', 2)]
  },
  {
    id: 'p7',
    slug: 'urban-retreat',
    name: 'Urban Retreat',
    category: 'Hospitality',
    location: RENDER_LABEL,
    hero_image: img('urban-retreat', 1),
    overview: 'A harmonious fusion of natural textures, open planning, and ambient lighting creates a dining environment that is elegant, welcoming, and memorable. The design balances functionality with warmth to elevate every shared moment.',
    design_challenge: '',
    design_solution: '',
    materials: ['Natural textures', 'Open planning', 'Timber pergola ceiling', 'Ambient lighting'],
    images: imageSet('urban-retreat', 4)
  },
  {
    id: 'p8',
    slug: 'ivory-apartment',
    name: 'The Ivory Apartment',
    category: 'Completed Homes',
    location: COMPLETED_LABEL,
    hero_image: img('ivory-apartment', 1),
    overview: 'A soft ivory apartment with a curved-edge TV unit and open shelving, a crystal chandelier, a channel-tufted headboard framed by cove lighting, and a compact study nook.',
    design_challenge: '',
    design_solution: '',
    materials: ['Ivory finishes', 'Crystal chandelier', 'Cove lighting', 'Channel-tufted upholstery'],
    images: imageSet('ivory-apartment', 4)
  },
  {
    id: 'p9',
    slug: 'the-true-rhythm',
    name: 'The True Rhythm',
    category: 'Bedroom',
    location: RENDER_LABEL,
    hero_image: img('the-true-rhythm', 1),
    overview: 'Where simplicity becomes the ultimate expression of luxury. Designed with a restrained monochrome palette, this bedroom showcases the perfect balance of texture, proportion, and light. Every detail has been thoughtfully curated to create a refined, luxurious, and inviting personal sanctuary.',
    design_challenge: '',
    design_solution: '',
    materials: ['Restrained monochrome palette', 'Fluted wall panelling', 'Smoked-glass wardrobe', 'Layered light'],
    images: imageSet('the-true-rhythm', 3)
  },
  {
    id: 'p10',
    slug: 'refined-comfort',
    name: 'Refined Comfort',
    category: 'Living & Dining',
    location: RENDER_LABEL,
    hero_image: img('refined-comfort', 1),
    overview: 'A contemporary living space that embraces clean lines, warm neutral tones, and layered lighting to create a calm yet luxurious ambiance. Thoughtfully composed materials, refined details, and balanced proportions deliver a timeless design that feels both elegant and inviting.',
    design_challenge: '',
    design_solution: '',
    materials: ['Clean lines', 'Warm neutral tones', 'Layered lighting', 'Marble-finish feature wall'],
    images: imageSet('refined-comfort', 3)
  },
  {
    id: 'p11',
    slug: 'pastel-family-home',
    name: 'The Pastel Family Home',
    category: 'Completed Homes',
    location: COMPLETED_LABEL,
    hero_image: img('pastel-family-home', 1),
    overview: 'A warm, lived-in family home with a blush-pink panelled dado, statement glass pendant lights, curated botanical artwork and an upholstered bedroom headboard.',
    design_challenge: '',
    design_solution: '',
    materials: ['Panelled dado', 'Glass pendant lights', 'Upholstered headboard', 'Wood-finish joinery'],
    images: imageSet('pastel-family-home', 3)
  },
  {
    id: 'p12',
    slug: 'the-dramatic-vibe',
    name: 'The Dramatic Vibe',
    category: 'Washroom',
    location: RENDER_LABEL,
    hero_image: img('the-dramatic-vibe', 1),
    overview: 'A bold monochrome washroom that blends dramatic marble textures with striking geometric patterns to create a refined, contemporary space. Carefully balanced materials, lighting, and clean detailing deliver a luxurious atmosphere with timeless sophistication.',
    design_challenge: '',
    design_solution: '',
    materials: ['Dramatic marble textures', 'Chevron tiles', 'Monochrome palette', 'Clean detailing'],
    images: imageSet('the-dramatic-vibe', 2)
  },
  {
    id: 'p13',
    slug: 'the-calming-habitat',
    name: 'The Calming Habitat',
    category: 'Washroom',
    location: RENDER_LABEL,
    hero_image: img('the-calming-habitat', 1),
    overview: 'Simple and clean proportions keep this washroom refreshing and calming, with a geometric feature wall, stone-look surfaces and a glass shower partition.',
    design_challenge: '',
    design_solution: '',
    materials: ['Clean proportions', 'Geometric feature tiles', 'Stone-look surfaces', 'Glass partition'],
    images: imageSet('the-calming-habitat', 2)
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', image_url: img('marble-and-walnut-home', 5), category: 'Completed Projects', caption: 'Backlit walnut niche with a brass gramophone accent', width: 1855, height: 1237 },
  { id: 'g2', image_url: img('opulence-and-elegance', 3), category: '3D Renders', caption: 'Fluted stone console wall with a black marble console and cove lighting', width: 840, height: 840 },
  { id: 'g3', image_url: '/images/portfolio/drawings/bedroom-elevation.jpg', category: '2D Drawings', caption: 'Bedroom elevation and plan with materials, finishes and lighting details', width: 1536, height: 1024 },
  { id: 'g4', image_url: '/images/portfolio/site-work/01.jpg', category: 'Site Work', caption: 'False ceiling and wardrobe shutters in progress', width: 720, height: 1280 },
  { id: 'g5', image_url: img('ivory-apartment', 3), category: 'Completed Projects', caption: 'Crystal chandelier set within a cove-lit ceiling', width: 630, height: 1120 },
  { id: 'g6', image_url: img('the-dramatic-vibe', 2), category: '3D Renders', caption: 'Monochrome washroom with dramatic marble and chevron tiles', width: 1536, height: 1536 },
  { id: 'g7', image_url: '/images/portfolio/drawings/floor-plan.jpg', category: '2D Drawings', caption: 'Residential apartment floor plan with furniture layout', width: 1536, height: 1024 },
  { id: 'g8', image_url: img('pastel-family-home', 3), category: 'Completed Projects', caption: 'Smoked glass pendants paired with botanical artwork', width: 674, height: 842 },
  { id: 'g9', image_url: '/images/portfolio/site-work/11.jpg', category: 'Site Work', caption: 'Carpentry and shelving being fitted on site', width: 504, height: 896 },
  { id: 'g10', image_url: img('linear-light-residence', 5), category: 'Completed Projects', caption: 'Hexagonal pendant cluster beneath a cove-lit ceiling', width: 1770, height: 1180 },
  { id: 'g11', image_url: '/images/portfolio/drawings/door-details.jpg', category: '2D Drawings', caption: 'Main door, safety door and lift lobby elevations with hardware details', width: 1536, height: 1024 },
  { id: 'g12', image_url: img('marble-and-walnut-home', 2), category: 'Completed Projects', caption: 'Pooja unit with arched display niches and a marble backdrop', width: 1333, height: 2000 },
  { id: 'g13', image_url: '/images/portfolio/drawings/washroom-layout.jpg', category: '2D Drawings', caption: 'Master washroom layout with elevations and fixture heights', width: 1536, height: 1024 },
  { id: 'g14', image_url: '/images/portfolio/site-work/08.jpg', category: 'Site Work', caption: 'Layered false ceiling framing before finishing', width: 896, height: 504 },
  { id: 'g15', image_url: img('pace-and-balance', 2), category: '3D Renders', caption: 'Lounge with sculptural wall art and ambient spot lighting', width: 1152, height: 731 },
  { id: 'g16', image_url: '/images/portfolio/site-work/09.jpg', category: 'Site Work', caption: 'Slatted balcony ceiling with spot lighting during execution', width: 720, height: 1280 }
];

export const CONTACT_FORM_FIELDS: FormField[] = [
  { id: 'name', label: 'Full Name', field_type: 'text', is_required: true, options: [], sort_order: 0, is_active: true },
  { id: 'phone', label: 'Phone / WhatsApp', field_type: 'tel', is_required: true, options: [], sort_order: 1, is_active: true },
  { id: 'email', label: 'Email Address', field_type: 'email', is_required: true, options: [], sort_order: 2, is_active: true },
  { id: 'project_type', label: 'Project Type', field_type: 'select', is_required: true, options: ['Full Home Interior', 'Living & Dining', 'Bedroom', 'Kitchen', 'Washroom', 'Restaurant / Café / Bar', 'Office / Commercial', '2D Drawings or 3D Renders Only', 'Other'], sort_order: 3, is_active: true },
  { id: 'budget_range', label: 'Approximate Budget', field_type: 'select', is_required: false, options: ['Not sure yet', 'Under ₹10 Lakh', '₹10 – 25 Lakh', '₹25 – 50 Lakh', '₹50 Lakh +'], sort_order: 4, is_active: true },
  { id: 'location', label: 'Project City / Area', field_type: 'text', is_required: false, options: [], sort_order: 5, is_active: true },
  { id: 'message', label: 'Tell Us About Your Space', field_type: 'textarea', is_required: true, options: [], sort_order: 6, is_active: true }
];

export const STUDIO_SETTINGS: StudioSettings = {
  id: 'default',
  address: 'Pune, Maharashtra, India',
  phone: '+91 84858 57626',
  email: 'spaces.ethereal@gmail.com',
  hours_weekday: '',
  hours_weekday_time: '',
  hours_weekend: '',
  hours_weekend_time: '',
  about_text: 'We are passionate creators of extraordinary environments, dedicated to transforming spaces into timeless expressions of beauty, functionality, and personal style.',
  privacy_policy: '',
  terms_of_service: ''
};

// Colour palettes and material swatches reproduced from the portfolio's "Tailored Colour Palettes" page.
export const COLOUR_PALETTES = [
  { name: 'Warm Neutrals', colors: ['#DAD7D0', '#BAAB9E', '#A6825F', '#7F6150'] },
  { name: 'Sage & Charcoal', colors: ['#CDD2CC', '#9BB9AC', '#435A3D', '#434343'] },
  { name: 'Stone & Walnut', colors: ['#B9B4B1', '#857264', '#574B42'] }
];

export const MATERIAL_SWATCHES = [
  { src: '/images/portfolio/materials/01.jpg', label: 'Textured Plaster' },
  { src: '/images/portfolio/materials/02.jpg', label: 'Soft Ivory' },
  { src: '/images/portfolio/materials/03.jpg', label: 'Brushed Metal' },
  { src: '/images/portfolio/materials/04.jpg', label: 'Natural Wood' },
  { src: '/images/portfolio/materials/05.jpg', label: 'Stone' }
];
