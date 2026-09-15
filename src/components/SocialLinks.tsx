import { BRAND } from '@/lib/brand';

type Network = keyof typeof BRAND.social;

// Outline icons in the same style as the rest of the site's icons (lucide-react 1.x no longer ships brand icons).
const NETWORKS: Record<Network, { label: string; icon: React.ReactNode }> = {
  instagram: {
    label: 'Instagram',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  facebook: {
    label: 'Facebook',
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  youtube: {
    label: 'YouTube',
    icon: (
      <>
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </>
    ),
  },
  linkedin: {
    label: 'LinkedIn',
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
};

const ORDER: Network[] = ['instagram', 'facebook', 'youtube', 'linkedin'];

export function SocialIcon({ network, size = 18 }: { network: Network; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {NETWORKS[network].icon}
    </svg>
  );
}

/** Social profile icons; networks without a link in BRAND.social, or listed in `exclude`, are not shown. */
export default function SocialLinks({ className = '', exclude = [] }: { className?: string; exclude?: Network[] }) {
  const networks = ORDER.filter((network) => BRAND.social[network] && !exclude.includes(network));
  if (networks.length === 0) return null;

  return (
    <ul className={`flex items-center gap-3 ${className}`} aria-label="Ethereal Spaces on social media">
      {networks.map((network) => (
        <li key={network}>
          <a
            href={BRAND.social[network]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ethereal Spaces on ${NETWORKS[network].label}`}
            title={NETWORKS[network].label}
            className="w-10 h-10 rounded-full border border-gold/25 text-ivory/80 hover:text-dark-bg hover:bg-ivory hover:border-ivory flex items-center justify-center transition-colors duration-300"
          >
            <SocialIcon network={network} />
          </a>
        </li>
      ))}
    </ul>
  );
}
