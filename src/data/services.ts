/**
 * Service catalogue. Each entry generates a page at /services/<slug>/.
 *
 * Content rules followed here:
 *  - Scope items come from the company's published service categories.
 *  - "record" paragraphs only cite work documented in public sources
 *    (see docs/research-report.md). Where no public record was found the
 *    field is left empty and the page shows no track-record claims.
 */
export type ProjectCategory =
  | 'water'
  | 'roads'
  | 'bridges'
  | 'drainage'
  | 'building'
  | 'coastal';

export interface Service {
  slug: string;
  number: string;
  title: string;
  navTitle: string;
  summary: string;
  metaDescription: string;
  image: string;
  imageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  intro: string;
  involves: string[];
  scope: string[];
  clients: string[];
  problems: string[];
  applications: string[];
  value: string[];
  /** Publicly documented track record. Leave '' when none is verified. */
  record: string;
  cta: { heading: string; text: string; button: string };
  projectCategories: ProjectCategory[];
}

export const services: Service[] = [
  {
    slug: 'water-infrastructure',
    number: '01',
    title: 'Water Infrastructure & Water Supply',
    navTitle: 'Water Infrastructure',
    summary:
      'Potable water wells, transmission and distribution mains, and complete community water supply systems, including in remote hinterland villages.',
    metaDescription:
      'Water well drilling, transmission and distribution mains, and community water supply systems in Guyana by R. Kissoon Contracting Service.',
    image: 'water-well',
    imageAlt: 'Illustrative image of a rotary drilling rig sinking a water well on savannah grassland',
    secondaryImage: 'water-trestle',
    secondaryImageAlt:
      'Illustrative image of an elevated storage trestle with tanks and a solar array serving a village water system',
    intro:
      'Reliable potable water starts below ground and ends at a household tap. We build every part of that chain: the well, the pumping and storage, and the pipe network that carries water through the community.',
    involves: [
      'A water supply project typically begins with drilling and developing a potable water well to the depth the aquifer requires, then casing, screening and testing it so that it yields clean water consistently. In communities without grid power, the well is commonly paired with a photovoltaic pumping system and elevated storage so that water is available by gravity throughout the day.',
      'From the source, transmission mains carry water to the settlement and distribution mains branch out to individual service connections. The work covers trench excavation, pipe laying and jointing, valves and fittings, pressure testing, backfilling and reinstatement. We also supply and deliver pipes and associated materials for utilities and programmes that install with their own crews.',
      'Much of this work takes place in hinterland and riverine communities, where materials and equipment must be moved by river, trail or air and the construction window depends on the season. Planning the logistics is as much a part of the job as the drilling itself.',
    ],
    scope: [
      'Construction of potable water wells',
      'Drilling and development of water wells',
      'Water transmission and distribution systems',
      'Installation of complete water supply systems',
      'Installation and extension of water mains',
      'Supply and delivery of water pipes and associated materials',
      'Water supply infrastructure in hinterland communities',
    ],
    clients: [
      'National and regional water utilities',
      'Government ministries and agencies',
      'Donor-funded community development programmes',
      'Village councils and community organisations',
      'Housing developers and institutions that need a dedicated supply',
    ],
    problems: [
      'Communities relying on creeks, rivers or rainwater with no treated or protected source',
      'Existing systems that no longer meet demand as a settlement grows',
      'Low pressure or no service at the far ends of a distribution network',
      'New housing areas, schools and health facilities that need a first connection',
    ],
    applications: [
      'New village water supply systems',
      'Replacement or additional production wells',
      'Extensions of transmission and distribution mains to unserved streets',
      'Upgrades to storage, pumping and service connections',
      'Dedicated wells for institutions and campuses',
    ],
    value: [
      'Water supply is the area where our public record is deepest, with systems reported as commissioned in several hinterland regions.',
      'We take on the full scope: well, pumping, storage, pipe network and service connections, so a client deals with one contractor from mobilisation to handover.',
      'We are accustomed to the logistics of remote sites, where access, weather and supply lines shape the programme.',
    ],
    record:
      'Public reports credit the company with community water systems commissioned at Kamarang and Jawalla in Region 7 and at Taruka, Monkey Mountain, Kamana and Sand Hill in Region 8, alongside further contract awards from Guyana Water Inc. and the Basic Needs Trust Fund.',
    cta: {
      heading: 'Planning a well or a water supply project?',
      text: 'Tell us the community or site, the number of households to be served and what exists today. We will respond with the information we need to prepare a quotation.',
      button: 'Request a water project quotation',
    },
    projectCategories: ['water'],
  },
  {
    slug: 'civil-engineering-infrastructure',
    number: '02',
    title: 'Civil Engineering & Infrastructure',
    navTitle: 'Civil & Infrastructure',
    summary:
      'Roads and all-weather roads, drainage structures, culverts, pipe laying and concrete bridges for housing developments, communities and public works.',
    metaDescription:
      'Road construction, all-weather roads, culverts, drainage structures, pipe laying and concrete bridge construction in Guyana.',
    image: 'road-hinterland',
    imageAlt: 'Illustrative image of a motor grader shaping a laterite all-weather road',
    secondaryImage: 'bridge',
    secondaryImageAlt: 'Illustrative image of a short-span reinforced concrete bridge under construction over a creek',
    intro:
      'Roads, drains, culverts and bridges are what turn surveyed land into a place people can live and work. We construct the horizontal infrastructure that opens up housing schemes, connects communities and keeps them accessible through the rainy season.',
    involves: [
      'Road construction covers clearing and earthworks, forming and compacting the sub-grade, placing sub-base and base layers and finishing with the specified surface, whether that is an asphaltic or concrete pavement or a laterite or crusher-run all-weather road. Proper shaping and side drains matter as much as the surface: a road that sheds water lasts.',
      'Alongside the carriageway we build the structures that move water under and beside it: reinforced concrete drains, box and pipe culverts, headwalls and outfalls. Pipe laying for water and drainage networks is carried out in the same corridor so that services are in place before the final surface.',
      'Where a road crosses a canal or creek, we construct reinforced concrete bridges, including foundations, abutments, deck and approaches.',
    ],
    scope: [
      'Construction of roads and highways',
      'Construction of all-weather roads',
      'Infrastructure development for housing schemes and new communities',
      'Drainage structures',
      'Culverts',
      'Pipe laying',
      'Concrete bridge construction',
      'Heavy-duty infrastructure works',
    ],
    clients: [
      'Housing and planning authorities',
      'Government ministries and regional administrations',
      'Community development and donor-funded programmes',
      'Private land developers',
      'Institutions and industrial operators that need site access and services',
    ],
    problems: [
      'Allocated house lots that cannot be occupied until roads and services are built',
      'Community roads that become impassable in the wet season',
      'Flooding caused by undersized or collapsed culverts and drains',
      'Sites separated from the road network by a canal or creek',
    ],
    applications: [
      'Road networks, drainage and pipe networks in new housing schemes',
      'Community and farm-to-market access roads',
      'Culvert and drain replacement programmes',
      'Access bridges for schools, institutions and communities',
      'Site development for public facilities',
    ],
    value: [
      'We deliver roads, drainage and pipe networks together under one contract, which avoids the sequencing problems that arise when each is built separately.',
      'Our road and infrastructure work has been carried out in interior locations, where plant, fuel and materials must be planned well ahead.',
      'Because we also build water systems, we understand how utilities and roadworks have to fit together in the same corridor.',
    ],
    record:
      'In 2023 the Central Housing and Planning Authority awarded the company the contract for roads, drainage and pipe networks at the Tract CHPA (Poke Bridge) housing scheme in Lethem, Region 9; a government update later that year reported the Phase Four roads complete and Phase Five in progress. In 2024 the Basic Needs Trust Fund contracted the company to build an access bridge at the University of Guyana Early Childhood Centre of Excellence.',
    cta: {
      heading: 'Have a road, drainage or bridge project to price?',
      text: 'Send us the location, drawings or bill of quantities if you have them, and the timeline you are working to.',
      button: 'Request a civil works quotation',
    },
    projectCategories: ['roads', 'bridges'],
  },
  {
    slug: 'building-construction',
    number: '03',
    title: 'Building Construction & Rehabilitation',
    navTitle: 'Building Construction',
    summary:
      'Construction of new buildings and the rehabilitation of existing ones, from foundations and structure through to finishes and external works.',
    metaDescription:
      'Construction of new buildings and rehabilitation of existing buildings for public and private clients in Guyana.',
    image: 'building',
    imageAlt: 'Illustrative image of a two-storey reinforced concrete building under construction',
    intro:
      'We construct new buildings and rehabilitate existing ones for public agencies and private clients, handling the structure, the envelope and the general construction works that make a building ready for use.',
    involves: [
      'New construction runs from site preparation and foundations through the structural frame, walls, roof, and on to doors, windows, finishes and external works. We work to the drawings and specifications issued by the client’s architect or engineer and coordinate the building services trades the design calls for.',
      'Rehabilitation is a different discipline. It starts with establishing what is sound and what is not, then repairing or replacing structure, roofing, floors, finishes and services, often while part of the facility stays in use.',
    ],
    scope: [
      'Construction of buildings',
      'Rehabilitation of existing buildings',
      'Structural works',
      'General construction works',
    ],
    clients: [
      'Government ministries and agencies',
      'Regional administrations and community programmes',
      'Schools, health facilities and other institutions',
      'Commercial and private clients',
    ],
    problems: [
      'Public services operating from buildings that are too small or have deteriorated',
      'Agencies that need storage, office or staff accommodation in interior locations',
      'Older buildings that are structurally serviceable but need renewal to stay in use',
    ],
    applications: [
      'Offices and administrative buildings',
      'Warehouses and storage facilities',
      'Staff quarters and accommodation',
      'Community, education and health buildings',
      'Renovation and extension of existing premises',
    ],
    value: [
      'We build in both coastal and interior locations, and plan material supply accordingly.',
      'We can deliver the building together with its access road, drainage and water supply where the site requires them.',
      'We work from the client’s drawings and specifications and keep the client informed as the work progresses.',
    ],
    record:
      'Public records show government building contracts awarded to the company, including a regional warehouse for the Civil Defence Commission at Lethem (2019) and staff living quarters at the Mazaruni Prison (2017).',
    cta: {
      heading: 'Building new or rehabilitating an existing facility?',
      text: 'Share the drawings or a description of the building, the location and your intended start date.',
      button: 'Request a building quotation',
    },
    projectCategories: ['building'],
  },
  {
    slug: 'sea-defence-coastal-protection',
    number: '04',
    title: 'Sea Defence & Coastal Protection',
    navTitle: 'Coastal Protection',
    summary:
      'Sea defence construction and related coastal infrastructure works that protect low-lying land, communities and farmland.',
    metaDescription:
      'Sea defence construction and related coastal infrastructure works along Guyana’s low-lying coast.',
    image: 'sea-defence',
    imageAlt: 'Illustrative image of an excavator placing boulders on a rip-rap sea defence',
    intro:
      'Most of Guyana’s population and farmland lies on a coastal plain at or below high-tide level. Sea and river defences are what keep it habitable, and they need to be built and maintained to withstand continual wave and tidal action.',
    involves: [
      'Sea defence construction generally involves forming or reinforcing an earthen embankment and armouring its seaward face so that wave energy is absorbed rather than eroding the bank. Rip-rap revetments of graded rock placed over a filter layer are the most common form; concrete structures are used where space or loading requires them.',
      'Related coastal works include access for plant along the embankment, drainage outfalls through the defence, and the repair of sections that have been breached or overtopped.',
    ],
    scope: ['Sea defence construction', 'Related coastal infrastructure works'],
    clients: [
      'Government ministries and agencies responsible for sea and river defences',
      'Regional administrations and local authorities',
      'Agricultural estates and landowners on the coast and river banks',
      'Developers of coastal and riverside property',
    ],
    problems: [
      'Erosion of embankments that protect housing and farmland',
      'Overtopping and breaches during spring tides',
      'Ageing defences that need strengthening or reconstruction',
    ],
    applications: [
      'Construction of new revetments',
      'Strengthening and raising of existing embankments',
      'Emergency and remedial repairs',
      'River bank protection',
    ],
    value: [
      'Sea defence work draws on the same earthmoving, rock-handling and concrete capability we apply to our road and drainage projects.',
      'We are based on the East Coast of Demerara, on the coastal plain these structures protect.',
      'We work to the engineer’s design and specification for each structure.',
    ],
    record: '',
    cta: {
      heading: 'Need to protect a coastline or river bank?',
      text: 'Tell us the location and length of the section, its current condition and any design information available.',
      button: 'Enquire about coastal works',
    },
    projectCategories: ['coastal'],
  },
  {
    slug: 'drainage-irrigation',
    number: '05',
    title: 'Drainage & Irrigation',
    navTitle: 'Drainage & Irrigation',
    summary:
      'Drainage infrastructure and irrigation systems, with the associated construction works, for communities and agricultural land.',
    metaDescription:
      'Construction of drainage infrastructure and irrigation systems for communities and agricultural land in Guyana.',
    image: 'drainage',
    imageAlt: 'Illustrative image of a long-reach excavator maintaining a drainage canal beside rice fields',
    secondaryImage: 'culvert',
    secondaryImageAlt: 'Illustrative image of a reinforced concrete box culvert being installed under a road',
    intro:
      'On flat, low-lying land, water has to be managed in both directions: drained quickly after heavy rain and delivered to crops in the dry months. We build the channels and structures that make that possible.',
    involves: [
      'Drainage works include the excavation and shaping of canals and drains, construction of reinforced concrete drains and culverts, and the control structures that regulate flow and discharge.',
      'Irrigation works include the construction of supply channels and the installation of irrigation pipelines and associated structures that bring water from the source to the field.',
    ],
    scope: [
      'Drainage infrastructure',
      'Irrigation systems',
      'Associated construction works, including concrete structures and pipe laying',
    ],
    clients: [
      'National drainage and irrigation agencies',
      'Regional administrations and neighbourhood councils',
      'Farmers’ groups, estates and agricultural developers',
      'Housing developers',
    ],
    problems: [
      'Flooding of residential areas and farmland after heavy rainfall',
      'Silted or undersized channels and failed structures',
      'Farmland without a dependable supply of irrigation water',
    ],
    applications: [
      'Community drainage improvement',
      'Drainage networks for new housing areas',
      'Construction and rehabilitation of concrete drainage structures',
      'Irrigation supply to cultivated land',
    ],
    value: [
      'Drainage structures and culverts are part of the road and housing infrastructure we build, so the methods and crews are established.',
      'We combine earthworks, concrete and pipe laying capability under one contractor.',
      'We work to the design levels and specifications provided by the client’s engineer.',
    ],
    record:
      'Drainage networks and culverts form part of the housing scheme infrastructure contract the company was awarded at Lethem, Region 9, in 2023.',
    cta: {
      heading: 'Dealing with flooding or planning an irrigation scheme?',
      text: 'Describe the area affected, the existing channels and structures, and what you need the works to achieve.',
      button: 'Enquire about drainage & irrigation',
    },
    projectCategories: ['drainage'],
  },
  {
    slug: 'equipment-rental',
    number: '06',
    title: 'Construction Equipment Rental',
    navTitle: 'Equipment Rental',
    summary:
      'Rental of construction machinery and equipment. Contact us with your requirement and we will confirm what is available.',
    metaDescription:
      'Construction equipment rental enquiries in Guyana. Contact R. Kissoon Contracting Service to confirm availability.',
    image: 'equipment',
    imageAlt: 'Illustrative image of construction machinery parked in a yard',
    intro:
      'We offer construction equipment for rental. Availability changes with our own project commitments, so the quickest route is to tell us what you need and for how long.',
    involves: [
      'Equipment rental gives contractors, developers and landowners access to machinery for the duration of a task without the cost of owning and maintaining it.',
      'When you enquire, let us know the type of machine, the work it will be doing, the location and the rental period. We will confirm availability, terms and transport arrangements directly.',
    ],
    scope: ['Equipment rental services', 'Construction machinery and equipment enquiries'],
    clients: [
      'Building and civil works contractors',
      'Developers and landowners',
      'Agricultural operators',
      'Public agencies and community groups',
    ],
    problems: [
      'Short-term need for machinery that does not justify a purchase',
      'Additional capacity required to keep a project on programme',
    ],
    applications: ['Earthworks and site preparation', 'Road and drainage works', 'Building projects'],
    value: [
      'You deal directly with a working contractor rather than a broker.',
      'We will tell you plainly what is and is not available for your dates.',
    ],
    record: '',
    cta: {
      heading: 'Need equipment for an upcoming job?',
      text: 'Send us the machine type, location and rental period and we will confirm availability.',
      button: 'Make a rental enquiry',
    },
    projectCategories: [],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug)!;
