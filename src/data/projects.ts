/**
 * Project portfolio.
 *
 * Every entry is backed by a public source (news report, government release
 * or procurement record). See docs/project-portfolio.md for the evidence.
 *
 * STATUS — choose honestly:
 *   'completed'   Publicly reported as commissioned / handed over.
 *   'in-progress' Publicly reported as under construction at the "asOf" date.
 *   'awarded'     Contract award or signing is documented; completion is not.
 *
 * TO ADD A PROJECT: copy an entry, change the fields, and (optionally) put a
 * photograph in src/assets/projects/ and set `photo` to its file name
 * (e.g. photo: 'taruka-well.jpg'). Only use genuine photographs of the
 * company's own work here — never illustrative or AI-generated images.
 */
import type { ProjectCategory } from './services';

export type ProjectStatus = 'completed' | 'in-progress' | 'awarded';

export interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  region: string;
  categories: ProjectCategory[];
  status: ProjectStatus;
  /** Human-readable date of the documented milestone. */
  date: string;
  /** ISO-ish sort key, newest first. */
  sort: string;
  dateLabel: 'Commissioned' | 'Contract awarded' | 'Contract signed' | 'Reported' | 'Awarded';
  description: string;
  scope?: string[];
  /** Publicly reported contract value. Hidden unless showValues is true. */
  value?: string;
  source: { label: string; url: string };
  photo?: string;
  featured?: boolean;
}

/** Set to true to print publicly reported contract values on project cards. */
export const showValues = false;

export const statusLabels: Record<ProjectStatus, string> = {
  completed: 'Completed',
  'in-progress': 'In progress when last reported',
  awarded: 'Contract award',
};

export const statusNotes: Record<ProjectStatus, string> = {
  completed: 'Publicly reported as commissioned.',
  'in-progress': 'Reported as under construction; current status to be confirmed.',
  awarded: 'Award is on public record; completion status has not been confirmed.',
};

export const categoryLabels: Record<ProjectCategory, string> = {
  water: 'Water infrastructure',
  roads: 'Roads & highways',
  bridges: 'Bridges',
  drainage: 'Drainage & irrigation',
  building: 'Building construction',
  coastal: 'Coastal protection',
};

export const projects: Project[] = [
  // ───────────── Completed (publicly reported as commissioned) ─────────────
  {
    id: 'kamana-sand-hill',
    title: 'Kamana and Sand Hill Water Supply Systems',
    client: 'Guyana Water Inc. / Ministry of Housing and Water',
    location: 'Kamana and Sand Hill',
    region: 'Region 8',
    categories: ['water'],
    status: 'completed',
    date: 'February 2024',
    sort: '2024-02',
    dateLabel: 'Commissioned',
    description:
      'Two community water systems serving about 361 residents. Kamana received a deep well with a piped network; Sand Hill, which had no previous supply, is served from a stream-fed intake and pumping chamber.',
    scope: [
      'Kamana: deep well, approx. 3,000 m of 50 mm and 1,000 m of 19 mm pipe, 50 service connections',
      'Sand Hill: intake and pumping chamber, approx. 800 m of 50 mm and 400 m of 19 mm pipe, 20 service connections',
    ],
    value: 'G$84 million (reported, both systems)',
    source: {
      label: 'Department of Public Information, Feb 2024',
      url: 'https://dpi.gov.gy/361-residents-of-kamana-sand-hill-benefitting-from-84m-water-supply-systems/',
    },
    featured: true,
  },
  {
    id: 'taruka',
    title: 'Taruka Water Supply System',
    client: 'Guyana Water Inc.',
    location: 'Taruka',
    region: 'Region 8',
    categories: ['water'],
    status: 'completed',
    date: 'February 2023',
    sort: '2023-02',
    dateLabel: 'Commissioned',
    description:
      'First functioning water supply for a village of more than 200 people who had relied on creek water and rainwater harvesting.',
    scope: [
      'Potable water well drilled to 150 m',
      '2,000 m of 50 mm and 500 m of 19 mm PVC pipe with 40 service connections',
      'Photovoltaic pumping system with submersible pump',
      'Rehabilitation of an existing elevated metal trestle',
    ],
    value: 'G$26.5 million (reported)',
    source: {
      label: 'Guyana Chronicle, 7 Feb 2023',
      url: 'https://guyanachronicle.com/2023/02/07/26-5m-water-supply-system-commissioned-at-taruka/',
    },
    featured: true,
  },
  {
    id: 'monkey-mountain',
    title: 'Monkey Mountain Water Supply System',
    client: 'Guyana Water Inc.',
    location: 'Monkey Mountain',
    region: 'Region 8',
    categories: ['water'],
    status: 'completed',
    date: 'April 2022',
    sort: '2022-04',
    dateLabel: 'Commissioned',
    description:
      'Village water supply system, one of three Region 8 water supply improvement contracts signed with the company in May 2021.',
    value: 'G$32.7 million (reported)',
    source: {
      label: 'Kaieteur News, 27 Aug 2026',
      url: 'https://kaieteurnewsonline.com/2026/08/27/25m-water-supply-system-for-new-monkey-mountain-secondary-school/',
    },
  },
  {
    id: 'jawalla',
    title: 'Jawalla Water Supply System',
    client: 'Guyana Water Inc.',
    location: 'Jawalla',
    region: 'Region 7',
    categories: ['water'],
    status: 'completed',
    date: 'March 2022',
    sort: '2022-03',
    dateLabel: 'Commissioned',
    description:
      'Water supply system for a riverine community of more than 600 residents on the Upper Mazaruni.',
    scope: [
      'Deep water well',
      'Pipe network with service connections',
      'Trestle with storage tanks',
      'Photovoltaic pumping system',
      'Perimeter fence',
    ],
    value: 'G$42 million (reported)',
    source: {
      label: 'Guyana Chronicle, 15 Mar 2022',
      url: 'https://guyanachronicle.com/2022/03/15/42m-water-supply-system-commissioned-at-jawalla/',
    },
    featured: true,
  },
  {
    id: 'kamarang',
    title: 'Kamarang Water Supply System',
    client: 'Guyana Water Inc.',
    location: 'Kamarang',
    region: 'Region 7',
    categories: ['water'],
    status: 'completed',
    date: 'November 2021',
    sort: '2021-11',
    dateLabel: 'Commissioned',
    description:
      'The community’s first potable water supply, serving about 700 people who previously depended on river water. The system draws from a 150 m well.',
    value: 'G$45 million (reported)',
    source: {
      label: 'Stabroek News, 20 Nov 2021',
      url: 'https://www.stabroeknews.com/2021/11/20/news/guyana/700-to-benefit-as-kamarang-gets-first-potable-water-supply/',
    },
  },

  // ───────────── In progress when last reported ─────────────
  {
    id: 'lethem-housing-infrastructure',
    title: 'Tract CHPA (Poke Bridge) Housing Scheme Infrastructure',
    client: 'Central Housing and Planning Authority',
    location: 'Lethem',
    region: 'Region 9',
    categories: ['roads', 'drainage'],
    status: 'in-progress',
    date: 'May 2023',
    sort: '2023-05',
    dateLabel: 'Contract awarded',
    description:
      'Infrastructure for a new housing scheme: road network, drainage networks and culverts, and pipe networks. A government update in September 2023 reported the Phase Four roads complete, with Phase Five roads, drainage and pipe works under way.',
    value: 'G$507 million (reported)',
    source: {
      label: 'Department of Public Information, Sept 2023',
      url: 'https://dpi.gov.gy/lethem-housing-programme-advancing/',
    },
    featured: true,
  },
  {
    id: 'kaibarupai',
    title: 'Kaibarupai Water Supply System',
    client: 'Guyana Water Inc.',
    location: 'Kaibarupai',
    region: 'Region 8',
    categories: ['water'],
    status: 'in-progress',
    date: 'April 2022',
    sort: '2022-04b',
    dateLabel: 'Reported',
    description:
      'First-time potable water access for about 500 residents. In April 2022 the system was reported as due to become fully operational within days; a commissioning report has not been located.',
    source: {
      label: 'Guyana Chronicle, 26 Apr 2022',
      url: 'https://guyanachronicle.com/2022/04/26/500-kaibarupai-residents-to-receive-potable-water-in-new-week/',
    },
  },

  // ───────────── Contract awards (completion not confirmed) ─────────────
  {
    id: 'dora-academy-well',
    title: 'Water Well at Dora Academy Campus',
    client: 'Ministry of Home Affairs',
    location: 'Dora Academy Campus',
    region: '',
    categories: ['water'],
    status: 'awarded',
    date: 'December 2025',
    sort: '2025-12',
    dateLabel: 'Awarded',
    description: 'Drilling of a water well to serve the academy campus.',
    source: {
      label: 'GuyanaProcurement award record, 24 Dec 2025',
      url: 'https://www.guyanaprocurement.com/suppliers/r-kissoon-contracting-service',
    },
  },
  {
    id: 'rupunau',
    title: 'Rupunau Water Supply System',
    client: 'Guyana Water Inc.',
    location: 'Rupunau',
    region: 'Region 9',
    categories: ['water'],
    status: 'awarded',
    date: 'February 2025',
    sort: '2025-02',
    dateLabel: 'Awarded',
    description: 'Installation of a water supply system for the village of Rupunau in the South Rupununi.',
    value: 'G$30,652,000',
    source: {
      label: 'GuyanaProcurement award record, 20 Feb 2025',
      url: 'https://www.guyanaprocurement.com/suppliers/r-kissoon-contracting-service',
    },
  },
  {
    id: 'wells-region-7',
    title: 'Wells at Kangaruma, Itaballi and Kaburi (72 Mile)',
    client: 'Guyana Water Inc.',
    location: 'Kangaruma, Itaballi and Kaburi',
    region: 'Region 7',
    categories: ['water'],
    status: 'awarded',
    date: 'June 2024',
    sort: '2024-06',
    dateLabel: 'Awarded',
    description: 'Drilling of potable water wells in three communities.',
    value: 'G$45,350,000',
    source: {
      label: 'GuyanaProcurement award record, 14 Jun 2024',
      url: 'https://www.guyanaprocurement.com/suppliers/r-kissoon-contracting-service',
    },
  },
  {
    id: 'kurukubaru',
    title: 'Kurukubaru Water Supply System',
    client: 'Basic Needs Trust Fund',
    location: 'Kurukubaru',
    region: 'Region 8',
    categories: ['water'],
    status: 'awarded',
    date: 'May 2024',
    sort: '2024-05b',
    dateLabel: 'Contract signed',
    description:
      'Deep water well, elevated trestle, transmission and distribution network, photovoltaic pumping system and solar stand-alone lights.',
    value: 'G$69,990,816',
    source: {
      label: 'Kaieteur News, 31 May 2024',
      url: 'https://www.kaieteurnewsonline.com/2024/05/31/69m-contract-signed-to-set-up-water-supply-system-at-kurukubaru/',
    },
  },
  {
    id: 'warawatta',
    title: 'Warawatta Water Supply System',
    client: 'Basic Needs Trust Fund',
    location: 'Warawatta',
    region: 'Region 8',
    categories: ['water'],
    status: 'awarded',
    date: 'May 2024',
    sort: '2024-05a',
    dateLabel: 'Contract signed',
    description: 'Water supply system for Warawatta Village, designed and supervised by E&A Consultants Inc.',
    value: 'Approx. G$68 million (reported)',
    source: {
      label: 'Kaieteur News, 1 Jun 2024',
      url: 'https://www.kaieteurnewsonline.com/2024/06/01/68m-contract-signed-to-boost-water-supply-in-warawatta/',
    },
  },
  {
    id: 'wells-region-3',
    title: 'Wells at Caria Caria, Santa Mission and Lower Bonasika Creek',
    client: 'Guyana Water Inc.',
    location: 'Caria Caria, Santa Mission and Lower Bonasika Creek',
    region: 'Region 3',
    categories: ['water'],
    status: 'awarded',
    date: 'March 2024',
    sort: '2024-03',
    dateLabel: 'Awarded',
    description:
      'Drilling of potable water wells (Lot 6) under a national programme of new wells for hinterland and riverine communities.',
    value: 'G$57,692,500',
    source: {
      label: 'Kaieteur News, 28 Mar 2024',
      url: 'https://kaieteurnewsonline.com/2024/03/28/over-300m-in-contracts-awarded-to-drill-new-water-wells-in-regions-13/',
    },
  },
  {
    id: 'ug-ecce-bridge',
    title: 'Access Bridge, UG Early Childhood Centre of Excellence',
    client: 'Basic Needs Trust Fund',
    location: 'University of Guyana, Turkeyen',
    region: 'Region 4',
    categories: ['bridges'],
    status: 'awarded',
    date: 'January 2024',
    sort: '2024-01',
    dateLabel: 'Contract signed',
    description: 'Construction of a bridge to improve access to the Early Childhood Centre of Excellence on the Turkeyen campus.',
    value: 'G$28,638,435',
    source: {
      label: 'Stabroek News, 13 Mar 2024',
      url: 'https://www.stabroeknews.com/2024/03/13/news/guyana/contract-signed-for-bridge-at-ug-early-childhood-centre/',
    },
    featured: true,
  },
  {
    id: 'quebanang',
    title: 'Quebanang Water Supply System',
    client: 'Guyana Water Inc.',
    location: 'Quebanang',
    region: 'Region 7',
    categories: ['water'],
    status: 'awarded',
    date: 'March 2023',
    sort: '2023-03c',
    dateLabel: 'Awarded',
    description: 'Installation of a new water supply and distribution system for Quebanang Village.',
    value: 'G$56,392,500',
    source: {
      label: 'Kaieteur News, 26 Sept 2023',
      url: 'https://www.kaieteurnewsonline.com/2023/09/26/56m-water-system-40m-housing-programme-announced-for-quebanang-village/',
    },
  },
  {
    id: 'parika-back-mains',
    title: 'Transmission and Distribution Mains, Parika Back',
    client: 'Guyana Water Inc.',
    location: 'Parika Back, East Bank Essequibo',
    region: 'Region 3',
    categories: ['water'],
    status: 'awarded',
    date: 'March 2023',
    sort: '2023-03b',
    dateLabel: 'Awarded',
    description: 'Extension of water transmission and distribution mains.',
    value: 'G$23,947,500',
    source: {
      label: 'GuyanaProcurement award record, 21 Mar 2023',
      url: 'https://www.guyanaprocurement.com/suppliers/r-kissoon-contracting-service',
    },
  },
  {
    id: 'galvanized-pipes',
    title: 'Supply and Delivery of 32 mm Galvanized Pipes',
    client: 'Guyana Water Inc.',
    location: 'Guyana',
    region: 'National',
    categories: ['water'],
    status: 'awarded',
    date: 'March 2023',
    sort: '2023-03a',
    dateLabel: 'Awarded',
    description: 'Supply and delivery of galvanized pipes to the national water utility.',
    value: 'G$89,500,000',
    source: {
      label: 'GuyanaProcurement award record, 21 Mar 2023',
      url: 'https://www.guyanaprocurement.com/suppliers/r-kissoon-contracting-service',
    },
  },
  {
    id: 'sawariwau',
    title: 'Sawariwau Water Supply Improvement',
    client: 'Guyana Water Inc.',
    location: 'Sawariwau',
    region: 'Region 9',
    categories: ['water'],
    status: 'awarded',
    date: 'November 2022',
    sort: '2022-11',
    dateLabel: 'Awarded',
    description: 'Water supply improvement project for the village of Sawariwau in the South Rupununi.',
    value: 'G$26,629,000',
    source: {
      label: 'GuyanaProcurement award record, 15 Nov 2022',
      url: 'https://www.guyanaprocurement.com/suppliers/r-kissoon-contracting-service',
    },
  },
  {
    id: 'lethem-immigration-office',
    title: 'Lethem Immigration Office',
    client: 'Government of Guyana',
    location: 'Lethem',
    region: 'Region 9',
    categories: ['building'],
    status: 'in-progress',
    date: 'May 2020',
    sort: '2020-05',
    dateLabel: 'Reported',
    description:
      'New immigration office building, reported as under construction by the company in May 2020. Completion has not been confirmed from public sources.',
    value: 'Approx. G$42.3 million (reported)',
    source: {
      label: 'Guyana Chronicle, 7 May 2020',
      url: 'https://guyanachronicle.com/2020/05/07/lethem-immigration-office-under-construction/',
    },
  },
  {
    id: 'cdc-warehouse-lethem',
    title: 'Regional Warehouse, Civil Defence Commission',
    client: 'Civil Defence Commission',
    location: 'Lethem',
    region: 'Region 9',
    categories: ['building'],
    status: 'awarded',
    date: 'May 2019',
    sort: '2019-05',
    dateLabel: 'Contract awarded',
    description: 'Construction of a regional warehouse for the national disaster response agency.',
    value: 'G$96,354,270',
    source: {
      label: 'Guyana Chronicle, 1 Jun 2019',
      url: 'https://guyanachronicle.com/2019/06/01/infrastructure-boost/',
    },
  },
  {
    id: 'mazaruni-living-quarters',
    title: 'Staff Living Quarters, Mazaruni Prison (Lot 2)',
    client: 'Government of Guyana',
    location: 'Mazaruni',
    region: 'Region 7',
    categories: ['building'],
    status: 'awarded',
    date: 'April 2017',
    sort: '2017-04',
    dateLabel: 'Contract awarded',
    description: 'Construction of living quarters, one of two lots awarded for the facility.',
    value: 'G$30,447,000',
    source: {
      label: 'Kaieteur News, 28 Apr 2017',
      url: 'https://kaieteurnewsonline.com/2017/04/28/58-5m-living-quarters-to-be-constructed-at-mazaruni-prison/',
    },
  },
  {
    id: 'kuru-kururu-network',
    title: 'Kuru Kuru and Kuru Kururu Water Network',
    client: 'Guyana Water Inc.',
    location: 'Kuru Kuru and Kuru Kururu, Soesdyke–Linden Highway',
    region: 'Region 4',
    categories: ['water'],
    status: 'awarded',
    date: 'July 2016',
    sort: '2016-07',
    dateLabel: 'Contract awarded',
    description: 'Installation of a transmission and distribution network with service connections.',
    value: 'G$47.9 million (reported)',
    source: {
      label: 'Stabroek News, 8 Jul 2016',
      url: 'https://stabroeknews.com/2016/07/08/news/guyana/contracts-awarded-lindensoesdyke-water-networks',
    },
  },
];

export const sortedProjects = [...projects].sort((a, b) => {
  const order = { completed: 0, 'in-progress': 1, awarded: 2 } as const;
  return order[a.status] - order[b.status] || b.sort.localeCompare(a.sort);
});

export const featuredProjects = sortedProjects.filter((p) => p.featured);
