export type ProductBrochure = {
  title: string;
  size: string;
  type: string;
  description: string;
};

export type TechnicalMethod = {
  standard: string;
  organization: string;
  title: string;
  applicableRange: string;
};

export const PRODUCT_IMAGE_MAP: Record<string, string[]> = {
  "7200-precision-isoperibol-calorimeter": [
    "/images/products/calorimeter-7200.jpg",
    "/images/products/calorimeter-hero.jpg",
  ],
  "7400-automatic-isoperibol-calorimeter": [
    "/images/products/calorimeter-7400.jpg",
    "/images/products/calorimeter-hero.jpg",
  ],
  "parr-6400-automatic-isoperibol-calorimeter": [
    "/images/products/calorimeter-hero.jpg",
    "/images/products/calorimeter-7200.jpg",
  ],
  "parr-6200-isoperibol-calorimeter": [
    "/images/products/calorimeter-7200.jpg",
    "/images/products/calorimeter-hero.jpg",
  ],
  "parr-6100-compensated-jacket-calorimeter": [
    "/images/products/calorimeter-7400.jpg",
    "/images/products/calorimeter-hero.jpg",
  ],
  "sylab-ecs-8024-carbon-sulfur-analyzer": [
    "/images/products/ecs-8024.jpg",
  ],
  "ecs-8024": [
    "/images/products/ecs-8024.jpg",
  ],
  "ofcu": [
    "/images/products/ofcu.jpg",
  ],
  "orlab-ofcu-ash-fusion-analyzer": [
    "/images/products/ofcu.jpg",
  ],
  "tga-3000": [
    "/images/products/tga-3000.jpg",
  ],
  "orlab-tga-3000-thermogravimetric-analyzer": [
    "/images/products/tga-3000.jpg",
  ],
  "ad-apollo-gx-ae-wp-gf-a-wp-series": [
    "/images/products/ad-fortis.jpg",
  ],
};

export const DEFAULT_STANDARDS: TechnicalMethod[] = [
  {
    standard: "ASTM D5865 / D5865M",
    organization: "ASTM International",
    title: "Standard Test Method for Gross Calorific Value of Coal and Coke",
    applicableRange: "Solid mineral fuels, calorific value determination with high precision",
  },
  {
    standard: "ISO 1928:2020",
    organization: "ISO",
    title: "Solid mineral fuels — Determination of gross calorific value by bomb calorimetric method",
    applicableRange: "International standard for coal, coke and solid biofuels",
  },
  {
    standard: "DIN 51900",
    organization: "DIN (German Institute for Standardization)",
    title: "Testing of solid and liquid fuels — Determination of gross calorific value",
    applicableRange: "Isoperibolic and static jacket oxygen combustion vessels",
  },
  {
    standard: "IS 1350 (Part-II)",
    organization: "Bureau of Indian Standards (BIS)",
    title: "Methods of Test for Coal and Coke: Determination of Calorific Value",
    applicableRange: "Mandatory standard for Indian thermal power plants and mining labs",
  },
];

export const DEFAULT_BROCHURES: ProductBrochure[] = [
  {
    title: "Technical Specification Sheet & Architecture Guide",
    size: "2.4 MB",
    type: "PDF Document",
    description: "Full engineering tolerances, installation prerequisites, electrical, and gas supply specifications.",
  },
  {
    title: "Comprehensive Application Handbook",
    size: "4.1 MB",
    type: "PDF Document",
    description: "Sample preparation protocols, combustion vessel handling, and ASTM/ISO standard compliance guidelines.",
  },
  {
    title: "Laboratory Pre-Installation & Site Readiness Checklist",
    size: "1.2 MB",
    type: "PDF Document",
    description: "Bench space, water chiller requirements, oxygen purity, and electrical earthing specifications.",
  },
  {
    title: "Preventive Maintenance & Hydrotesting Protocol",
    size: "850 KB",
    type: "PDF Document",
    description: "Annual maintenance schedule, oxygen bomb inspection thresholds, and calibration certificate guidelines.",
  },
];

export const DEFAULT_FAQS = [
  {
    q: "How does the true isoperibol measurement principle differ from static jacket calorimeters?",
    a: "In a true isoperibol calorimeter, the jacket temperature is continuously regulated to maintain an exact, constant temperature surrounding the bucket throughout the entire test. Highly accurate thermistors measure heat transfer across the fixed temperature gradient, allowing the microprocessor to apply rigorous thermal leakage corrections for unmatched precision (0.1% RSD class).",
  },
  {
    q: "What are the oxygen combustion vessel inspection and hydrotesting requirements?",
    a: "Under international safety regulations (ASTM and ASME vessel codes), combustion bombs must undergo routine inspection every 500 firings and annual hydrostatic pressure testing up to 300 bar (4,500 psi). Orbit Technologies provides factory-authorized hydrostatic testing, seal re-facing, and certification in India in direct collaboration with Parr Instrument Company.",
  },
  {
    q: "What utilities and lab infrastructure are required for installation?",
    a: "Requirements include a stable laboratory bench capable of supporting 50 kg, a 230V / 50Hz clean regulated power supply with dedicated grounding, high-purity commercial oxygen (minimum 99.5% purity) regulated between 400–450 psi, and deionised water for bucket filling and cooling circulation.",
  },
  {
    q: "Can this instrument be interfaced with analytical balances and Laboratory Information Management Systems (LIMS)?",
    a: "Yes. The instrument features standard RS-232, dual USB ports, and a TCP/IP Ethernet network interface. It connects seamlessly to analytical balances (such as A&D, Mettler, or Sartorius) to automatically capture tare and sample weights, and outputs structured test results directly to LIMS databases.",
  },
  {
    q: "What sample types can be tested with this system?",
    a: "It accommodates solid and liquid combustible samples including bituminous coal, anthracite, lignite, metallurgical coke, petroleum products (heavy fuel oils, diesel, aviation kerosene), solid biofuels (pellets, bagasse, wood chips), refuse-derived fuel (RDF), and food/feed nutritionals.",
  },
  {
    q: "What after-sales service and warranty support is provided by Orbit Technologies?",
    a: "All instruments supplied by Orbit Technologies include comprehensive manufacturer warranty, on-site installation and commissioning by certified engineers, hands-on user training, application support, and availability of genuine replacement seals, ignition wires, and crucibles stocked locally in Hyderabad.",
  },
];
