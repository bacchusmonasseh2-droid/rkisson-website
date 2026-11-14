/**
 * Single source of truth for company details.
 * Update values here and they change across the whole website.
 *
 * Anything left as an empty string ('') is treated as "not yet confirmed"
 * and the related feature (WhatsApp button, map, social links) stays hidden.
 */
export const company = {
  name: 'R. Kissoon Contracting Service',
  shortName: 'R. Kissoon',
  slogan: 'Building With Integrity',
  description:
    'R. Kissoon Contracting Service is a Guyanese civil works and construction contractor delivering water supply systems, wells, roads, drainage structures, bridges and buildings on the coast and in hinterland communities.',

  address: {
    line1: 'Lot 687, 18th Street',
    line2: 'Foulis Housing Scheme',
    region: 'East Coast Demerara',
    country: 'Guyana',
  },

  phones: [
    { label: 'Office', display: '+592 255-0049', tel: '+5922550049' },
    { label: 'Office', display: '+592 255-0793', tel: '+5922550793' },
    { label: 'Mobile', display: '+592 624-0484', tel: '+5926240484' },
  ],

  email: 'rkissooncontractingservices@gmail.com',

  /** Add the number in international format without "+" (e.g. '5926240484')
   *  ONLY once the company confirms it is a WhatsApp number. */
  whatsapp: '',

  /** Paste a Google Maps embed URL (Share → Embed a map → src value) once the
   *  exact location pin has been confirmed by the company. */
  mapEmbedUrl: '',

  /** Add verified profile URLs only. Empty entries are not rendered. */
  social: {
    facebook: '',
    linkedin: '',
    instagram: '',
  },

  /** Set to the final domain before launch — used for canonical URLs and sitemap. */
  siteUrl: 'https://rkissooncontracting.netlify.app',
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Services' },
  { href: '/projects/', label: 'Projects' },
  { href: '/equipment-rental/', label: 'Equipment Rental' },
  { href: '/contact/', label: 'Contact' },
];
