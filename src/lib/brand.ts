// Single source of truth for studio contact details (from the Ethereal Spaces portfolio).

const WHATSAPP_NUMBER = '918485857626';
const GREETING = 'Hello Ethereal Spaces, I would like to discuss an interior design project.';

/** WhatsApp chat link to the studio with a pre-filled message. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const ENQUIRY_LABELS: Record<string, string> = {
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  project_type: 'Project type',
  budget_range: 'Budget',
  location: 'City / area',
  message: 'Details',
};

/** Turns enquiry form answers into a WhatsApp message the visitor can send to the studio. */
export function enquiryWhatsAppMessage(data: Record<string, string>) {
  const lines = Object.entries(ENQUIRY_LABELS)
    .filter(([key]) => data[key]?.trim())
    .map(([key, label]) => `${label}: ${data[key].trim()}`);
  return [GREETING, '', ...lines].join('\n');
}

export const BRAND = {
  name: 'Ethereal Spaces',
  legalName: 'Ethereal Spaces Interior',
  tagline: 'Elegance Redefined | Spaces Reimagined',
  phoneDisplay: '+91 84858 57626',
  phoneHref: `tel:+${WHATSAPP_NUMBER}`,
  whatsappHref: whatsappLink(GREETING),
  email: 'spaces.ethereal@gmail.com',
  siteUrl: 'https://etherealspaces-three.vercel.app',
} as const;
