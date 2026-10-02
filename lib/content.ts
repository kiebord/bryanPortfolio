export const site = {
  name: "Bryan Andrade",
  firstName: "Bryan",
  lastName: "Andrade",
  course: "BS Information Technology",
  year: "2nd Year",
  email: "bryan.andrade@example.com",
  role: "Web developer and designer",
  tagline: "I build clean, fast websites and apps, and I care about how they look.",
  description:
    "Portfolio of Bryan Andrade, BS Information Technology student. Web projects, design work and gallery.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
];

export const stats = [
  { value: "6", label: "Projects built" },
  { value: "12", label: "Tools and languages" },
  { value: "2", label: "Years in the program" },
];

export const projectCategories = ["Web", "Mobile", "Design", "AI and IoT"] as const;
export type ProjectCategory = (typeof projectCategories)[number];

export type Project = {
  id: string;
  title: string;
  year: string;
  summary: string;
  image: string;
  categories: ProjectCategory[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "pulse-dashboard",
    title: "Pulse Dashboard",
    year: "2026",
    summary:
      "An analytics dashboard that turns raw numbers into one calm screen. Live stat cards, a weekly chart and a collapsible sidebar.",
    image: "/images/project-1.svg",
    categories: ["Web", "Design"],
    tags: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    id: "rentwise",
    title: "Rentwise",
    year: "2026",
    summary:
      "A rental management app for small landlords. Track tenants, due dates and payments from the phone.",
    image: "/images/project-2.svg",
    categories: ["Web", "Mobile"],
    tags: ["React", "Node.js", "MySQL"],
  },
  {
    id: "kiosk-one",
    title: "Kiosk One",
    year: "2025",
    summary:
      "A touch-first self-service kiosk interface with big targets, clear steps and a hardware-ready layout.",
    image: "/images/project-3.svg",
    categories: ["AI and IoT", "Design"],
    tags: ["Python", "Raspberry Pi", "UI design"],
  },
  {
    id: "brewline",
    title: "Brewline",
    year: "2025",
    summary:
      "A coffee ordering app with a shop menu, saved orders and a fast checkout flow.",
    image: "/images/project-4.svg",
    categories: ["Mobile", "Design"],
    tags: ["Figma", "React Native"],
  },
  {
    id: "scanly",
    title: "Scanly",
    year: "2025",
    summary:
      "A QR attendance scanner that works offline and syncs when the connection comes back.",
    image: "/images/project-5.svg",
    categories: ["AI and IoT", "Mobile"],
    tags: ["PWA", "QR codes", "IndexedDB"],
  },
  {
    id: "shein-redesign",
    title: "Shein Redesign",
    year: "2026",
    summary:
      "A desktop shopping experience redesigned in Figma with clear product filters, categories, search and a focused fashion catalog.",
    image: "/images/shein-redesign.png",
    categories: ["Web", "Design"],
    tags: ["Figma", "UI/UX", "E-commerce"],
  },
];

export const about = {
  bio: [
    "I am a BS Information Technology student who likes building things people actually use. I started with small websites and kept going until the projects got bigger.",
    "I enjoy the full path from idea to screen: sketching the layout, writing the code and polishing the details. I prefer simple, readable designs with one strong idea.",
    "Right now I am focused on modern web development, mobile-friendly interfaces and projects that mix software with hardware.",
  ],
  skillGroups: [
    { title: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
    { title: "Backend", items: ["Node.js", "MySQL", "REST APIs"] },
    { title: "Design", items: ["Figma", "Layout", "Typography", "Branding"] },
    { title: "Other", items: ["Python", "Raspberry Pi", "Git"] },
  ],
  timeline: [
    { when: "Year 1", what: "Programming basics, web fundamentals and first websites." },
    { when: "Year 2", what: "Databases, systems analysis and team projects." },
  ],
};

export const galleryCategories = ["Personal", "Workspace", "Design", "Campus", "Events"] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  image: string;
  categories: GalleryCategory[];
};

export const gallery: GalleryItem[] = [
  { id: "g1", title: "Out with friends", caption: "A sunny day out with friends around the neighborhood.", image: "/images/bryan-gallery-friends.png", categories: ["Personal"] },
  { id: "g2", title: "Court side", caption: "A quick photo after time on the basketball court.", image: "/images/bryan-gallery-court.png", categories: ["Personal"] },
  { id: "g3", title: "Outdoor escape", caption: "Exploring a rocky outdoor spot surrounded by nature.", image: "/images/bryan-gallery-outdoors.png", categories: ["Personal"] },
  { id: "g4", title: "Candid moment", caption: "A relaxed candid portrait during a quiet afternoon.", image: "/images/bryan-gallery-candid.png", categories: ["Personal"] },
  { id: "g5", title: "Campus skyline", caption: "The city at dusk, seen from campus.", image: "/images/gallery-5.svg", categories: ["Campus"] },
  { id: "g6", title: "Study corridor", caption: "The quiet hallway before a deadline.", image: "/images/gallery-6.svg", categories: ["Campus", "Workspace"] },
  { id: "g7", title: "Hackathon stage", caption: "Stage lights and a full room.", image: "/images/gallery-7.svg", categories: ["Events"] },
  { id: "g8", title: "Demo day", caption: "Final demo on the big screen.", image: "/images/gallery-8.svg", categories: ["Events", "Campus"] },
  { id: "g9", title: "Circuit sketch", caption: "Wiring plan for an IoT build.", image: "/images/gallery-9.svg", categories: ["Workspace", "Design"] },
  { id: "g10", title: "Red waves", caption: "A pattern study used on a poster.", image: "/images/gallery-10.svg", categories: ["Design", "Events"] },
];
