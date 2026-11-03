export type NewsItem = {
  date: string;
  title: string;
  category: string;
  body: string;
};

export const latestNews: NewsItem[] = [
  {
    date: "Oct 22",
    title: "Oxygen Flask Combustion Unit (OFCU)",
    category: "New product",
    body: "A compact combustion unit for rapid sample digestion ahead of ion chromatography and ICP analysis.",
  },
  {
    date: "Oct 22",
    title: "Expanded range of other instruments",
    category: "Catalogue update",
    body: "New additions to our catalogue of specialised laboratory and analytical instruments.",
  },
  {
    date: "Oct 10",
    title: "A&D Fortis FZ(-WP)/FX(-WP) Series",
    category: "New product",
    body: "IP68 water-protected precision balances for demanding industrial and laboratory environments.",
  },
  {
    date: "Oct 07",
    title: "7200 Precision Isoperibol Calorimeter",
    category: "Product spotlight",
    body: "High-precision true isoperibol automatic calorimeter from Parr Instrument Company, USA.",
  },
  {
    date: "Oct 05",
    title: "7400 Automatic Isoperibol Calorimeter",
    category: "Product spotlight",
    body: "Fully automatic isoperibol calorimeter built for high-throughput fuel testing laboratories.",
  },
];

export type EventItem = {
  date: string;
  show: string;
  location: string;
  hall: string;
  /** JPG banner/poster for the home-page event carousel. */
  image?: string;
  /** Link target — external event site or internal page. */
  href?: string;
};

export const events: EventItem[] = [
  {
    date: "26th – 28th October 2026",
    show: "Arablab Live 2026",
    location: "Dubai World Trade Centre, UAE",
    hall: "Hall No. 3, Booth: SSH3-B66",
    image: "/images/events/arablab-2026.jpg",
    href: "https://www.arablab.com/",
  },
  {
    date: "28th November to 30th November 2023",
    show: "PMEC India",
    location: "Greater Noida, Delhi",
    hall: "Hall No: 14, Stand No: D58",
    image: "/images/events/pmec.jpg",
  },
  {
    date: "14th September to 16th September 2023",
    show: "India Lab Expo",
    location: "HITEX Exhibition Centre, Hyderabad",
    hall: "Hall No: 2, Stall No: L31",
    image: "/images/events/india-lab-expo.jpg",
  },
  {
    date: "19th September to 21st September 2023",
    show: "Arablab",
    location: "Sheikh Saeed Halls, Dubai International Centre, UAE",
    hall: "Hall No: S3, Stand No: 1127",
  },
];

export type LatestProduct = {
  name: string;
  category: string;
  image: string;
  badge: string;
  href: string;
};

/** Newest catalogue additions — drives the "Latest products" JPG carousel. */
export const latestProducts: LatestProduct[] = [
  {
    name: "7400 Automatic Isoperibol Calorimeter",
    category: "Calorimeters",
    image: "/images/products/calorimeter-7400.jpg",
    badge: "Product spotlight",
    href: "/products/7400-automatic-isoperibol-calorimeter",
  },
  {
    name: "7200 Precision Isoperibol Calorimeter",
    category: "Calorimeters",
    image: "/images/products/calorimeter-7200.jpg",
    badge: "New in 2026",
    href: "/products/7200-precision-isoperibol-calorimeter",
  },
  {
    name: "TGA 3000 Thermogravimetric Analyser",
    category: "Thermogravimetric Analysers",
    image: "/images/products/tga-3000.jpg",
    badge: "Featured",
    href: "/products/tga-3000",
  },
  {
    name: "Oxygen Flask Combustion Unit (OFCU)",
    category: "Sample Preparation",
    image: "/images/products/ofcu.jpg",
    badge: "New product",
    href: "/products",
  },
  {
    name: "ECS Series Elemental Combustion System",
    category: "Elemental Analyzers",
    image: "/images/products/ecs-8024.jpg",
    badge: "Catalogue update",
    href: "/products",
  },
  {
    name: "A&D Fortis FZ(-WP)/FX(-WP) Series",
    category: "Laboratory Balances",
    image: "/images/products/ad-fortis.jpg",
    badge: "New product",
    href: "/news",
  },
];
