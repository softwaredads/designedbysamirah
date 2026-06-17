export type FeaturedSpace = {
  id: string;
  issue: string;
  title: string;
  location: string;
  caption: string;
  image: string;
  imageAlt: string;
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
  featured?: boolean;
};

export const featuredSpaces: FeaturedSpace[] = [
  {
    id: "belgravia-residence",
    issue: "Issue I",
    title: "Belgravia Residence",
    location: "London",
    caption: "Where marble breathes and light learns to linger.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=80",
    imageAlt: "Elegant living room with marble surfaces and natural light",
  },
  {
    id: "riviera-penthouse",
    issue: "Issue II",
    title: "Riviera Penthouse",
    location: "French Riviera",
    caption: "The sea, distilled into linen, brass, and shadow.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
    imageAlt: "Luxury penthouse interior with coastal views",
  },
  {
    id: "kyoto-gallery-house",
    issue: "Issue III",
    title: "Kyoto Gallery House",
    location: "Japan",
    caption: "Silence arranged. Space as sculpture.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    imageAlt: "Minimalist interior with warm wood and curated art",
  },
  {
    id: "manhattan-atelier",
    issue: "Issue IV",
    title: "Manhattan Atelier",
    location: "New York",
    caption: "Urban restraint. Every edge considered.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    imageAlt: "Sophisticated New York apartment interior",
  },
];

export const processItems: ProcessItem[] = [
  {
    id: "moodboard",
    label: "Mood Board",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    imageAlt: "Interior design mood board with fabric and material samples",
  },
  {
    id: "sketch",
    label: "Sketch",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    imageAlt: "Architectural interior sketch on paper",
  },
  {
    id: "swatches",
    label: "Swatches",
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=800&q=80",
    imageAlt: "Fabric and material swatches for interior design",
  },
  {
    id: "detail",
    label: "Detail",
    image:
      "https://images.unsplash.com/photo-1615873964953-d609969a20ed?w=800&q=80",
    imageAlt: "Close-up of luxury interior material detail",
  },
];

export const pressItems: PressItem[] = [
  {
    id: "oscar",
    publication: "Academy of Motion Picture Arts",
    headline: "Oscar for Production Design — A World Built in Light",
    year: "2024",
    featured: true,
  },
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
