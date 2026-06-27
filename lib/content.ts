export type FeaturedSpace = {
  id: string;
  title: string;
  location: string;
  serviceType: string;
  year: string;
  scope: string;
  client: string;
  caption: string;
  image: string;
  imageAlt: string;
};

export type ServiceCategory = {
  id: string;
  title: string;
  shortLabel: string;
  summary: string;
  items: string[];
};

export type ProcessItem = {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
};

export type PressItem = {
  id: string;
  publication: string;
  headline: string;
  year: string;
};

export const aboutSamirah = {
  name: "Samirah",
  role: "Founder & Principal Designer",
  image:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
  imageAlt: "Samirah, founder of Designed by Samirah",
  bio: "Samirah founded the studio on a simple belief: every room should feel intentional. She leads each private commission — from first conversation through concept, sourcing and install — for clients in London and internationally.",
};

/** Hero image for the About slide — swap for a real studio portrait when ready */
export const studioHeroImage = {
  src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2000&q=85",
  alt: "Luxury interior living space",
};

export const featuredSpaces: FeaturedSpace[] = [
  {
    id: "belgravia-residence",
    title: "Belgravia Residence",
    location: "London",
    serviceType: "Full residence design",
    year: "2024",
    scope: "Living, kitchen & primary suite",
    client: "Private client",
    caption: "Where marble breathes and light learns to linger.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80",
    imageAlt: "Elegant living room with marble surfaces and natural light",
  },
  {
    id: "riviera-penthouse",
    title: "Riviera Penthouse",
    location: "French Riviera",
    serviceType: "Penthouse design",
    year: "2023",
    scope: "Open-plan living & terrace",
    client: "Private client",
    caption: "The sea, distilled into linen, brass, and shadow.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
    imageAlt: "Luxury penthouse interior with coastal views",
  },
  {
    id: "kyoto-gallery-house",
    title: "Kyoto Gallery House",
    location: "Japan",
    serviceType: "Gallery house",
    year: "2024",
    scope: "Gallery, study & guest wing",
    client: "Private collector",
    caption: "Silence arranged. Space as sculpture.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    imageAlt: "Minimalist interior with warm wood and curated art",
  },
  {
    id: "manhattan-atelier",
    title: "Manhattan Atelier",
    location: "New York",
    serviceType: "Urban residence",
    year: "2023",
    scope: "Full apartment refurbishment",
    client: "Private client",
    caption: "Urban restraint. Every edge considered.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    imageAlt: "Sophisticated New York apartment interior",
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: "design",
    title: "Design & Planning",
    shortLabel: "Design",
    summary: "Concept, layout, materials and lighting.",
    items: [
      "Interior concept development",
      "Space planning and layout design",
      "Mood boards and design presentations",
      "Colour, material and finish selection",
      "Lighting design",
      "Furniture planning",
      "Storage solutions",
      "Brand integration (commercial projects)",
    ],
  },
  {
    id: "technical",
    title: "Technical Design",
    shortLabel: "Technical",
    summary: "Surveys, drawings and construction documentation.",
    items: [
      "Measured surveys",
      "Floor plans and elevations",
      "Joinery and bespoke cabinetry drawings",
      "Electrical and lighting plans",
      "Construction documentation",
      "Building regulation coordination",
    ],
  },
  {
    id: "visualisation",
    title: "3D Visualisation",
    shortLabel: "3D Visuals",
    summary: "See the design before a single wall is built.",
    items: [
      "3D renders",
      "Virtual walkthroughs",
      "Design animations",
      "Presentation boards",
    ],
  },
  {
    id: "ffe",
    title: "Furniture, Fixtures & Equipment",
    shortLabel: "FF&E",
    summary: "Sourcing, specification and procurement.",
    items: [
      "Furniture sourcing",
      "Bespoke furniture design",
      "Fixture and equipment specification",
      "Art and accessories selection",
      "Procurement management",
    ],
  },
  {
    id: "management",
    title: "Project Management",
    shortLabel: "Management",
    summary: "Budget, schedule and site coordination.",
    items: [
      "Budget planning",
      "Scheduling and timelines",
      "Contractor coordination",
      "Supplier management",
      "Site inspections",
      "Quality control",
    ],
  },
  {
    id: "renovation",
    title: "Renovation & Fit-Out",
    shortLabel: "Renovation",
    summary: "Construction oversight through to handover.",
    items: [
      "Contractor tendering",
      "Construction oversight",
      "Installation management",
      "Final snagging and handover",
    ],
  },
  {
    id: "styling",
    title: "Styling Services",
    shortLabel: "Styling",
    summary: "The finishing layer that makes a house a home.",
    items: [
      "Final furniture placement",
      "Decorative styling",
      "Artwork installation",
      "Soft furnishing selection",
    ],
  },
  {
    id: "specialist",
    title: "Specialist Services",
    shortLabel: "Specialist",
    summary: "Additional expertise available on enquiry.",
    items: [
      "Sustainable design consultancy",
      "Accessibility design",
      "Workplace strategy",
      "Hospitality design",
      "Retail experience design",
      "Kitchen and bathroom design",
      "Heritage property refurbishment",
    ],
  },
];

export const processItems: ProcessItem[] = [
  {
    id: "moodboard",
    label: "Discover",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    imageAlt: "Interior design mood board with fabric and material samples",
  },
  {
    id: "sketch",
    label: "Design",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    imageAlt: "Architectural interior sketch on paper",
  },
  {
    id: "swatches",
    label: "Specify",
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
    imageAlt: "Fabric and material swatches for interior design",
  },
  {
    id: "detail",
    label: "Deliver",
    image:
      "https://images.unsplash.com/photo-1615873964953-d609969a20ed?w=800&q=80",
    imageAlt: "Close-up of luxury interior material detail",
  },
];

export const pressItems: PressItem[] = [
  {
    id: "ad",
    publication: "Architectural Digest",
    headline: "The Quiet Revolution of Samirah's Interiors",
    year: "2025",
  },
  {
    id: "vogue",
    publication: "Vogue Living",
    headline: "Inside the Studio Shaping Modern Elegance",
    year: "2025",
  },
  {
    id: "ft",
    publication: "Financial Times",
    headline: "How One Designer Reimagined the Luxury Home",
    year: "2024",
  },
];

/** Background for the services slide */
export const servicesHeroImage = {
  src: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=2000&q=80",
  alt: "Material samples and design details",
};
