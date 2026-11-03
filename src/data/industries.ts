export type Industry = {
  slug: string;
  name: string;
  blurb: string;
  instruments: string[];
};

/** v4's eight target industries. Slugs match src/components/icons.tsx industryIcons keys. */
export const industries: Industry[] = [
  {
    slug: "coal-coke-fuels",
    name: "Coal, Coke & Fuels",
    blurb:
      "Calorific value, proximate and ultimate analysis for coal, coke, biomass, petroleum coke and alternative fuels — power plants, captive generation and fuel traders.",
    instruments: ["Calorimeters", "Proximate Analyzers", "Ash Fusion Analyzers", "Elemental Analyzers"],
  },
  {
    slug: "cement",
    name: "Cement",
    blurb:
      "Raw meal, clinker and cement QC — elemental analysis of major and minor oxides, loss on ignition and free-lime testing for pyro and grinding circuits.",
    instruments: ["Elemental Analyzers", "TGA / Proximate", "Mills & Pulverisers", "Certified Reference Materials"],
  },
  {
    slug: "steel-metallurgy",
    name: "Steel & Metallurgy",
    blurb:
      "Carbon and sulfur in iron ore, sinter, fluxes and finished metals, plus ONH in steel — fast, repeatable heat-level control from the lab bench.",
    instruments: ["Elemental Analyzers", "Induction Fusion", "Balances", "Consumables"],
  },
  {
    slug: "minerals-mining",
    name: "Minerals & Mining",
    blurb:
      "Assay and process control for base and precious metals, ores, minerals and geological samples — from exploration drilling to plant flow sheets.",
    instruments: ["Elemental Analyzers", "Sample Preparation", "Pulverisers & Sieves", "Reference Materials"],
  },
  {
    slug: "chemicals-petrochemicals",
    name: "Chemicals & Petrochemicals",
    blurb:
      "Parr laboratory reactors and pressure vessels for catalysis, polymerisation and corrosion work, plus CHNS/O analysis of intermediates and products.",
    instruments: ["Laboratory Reactors", "Elemental Analyzers", "TGA", "Gas Generators"],
  },
  {
    slug: "pharmaceuticals-life-sciences",
    name: "Pharmaceuticals & Life Sciences",
    blurb:
      "Reaction calorimetry, process safety screening and elemental impurity testing for formulation, API and biotech development laboratories.",
    instruments: ["Reaction Calorimeters", "Laboratory Reactors", "Elemental Analyzers", "Balances"],
  },
  {
    slug: "food-agriculture",
    name: "Food & Agriculture",
    blurb:
      "Protein, fat and energy in food, feed, grain, soil and fertiliser — combustion analysis and bomb calorimetry for QA labs and research stations.",
    instruments: ["Calorimeters", "Elemental Analyzers", "Mills & Pulverisers", "Certified Reference Materials"],
  },
  {
    slug: "research-education",
    name: "Research & Education",
    blurb:
      "Complete teaching and research laboratories — elemental and thermal analysis, high-temperature furnaces and versatile Parr reactor systems.",
    instruments: ["Elemental Analyzers", "Laboratory Reactors", "Furnaces", "Sample Preparation"],
  },
];