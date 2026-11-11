// Lucca — the live Webflow site's menus (www.lucca.vet, published 2026-11-09), as data.
// Header.astro renders `headerNav`; Footer.astro renders `footerMenus`. Paths are the live
// site's own, so redirects stay 1:1 when the inner pages are rebuilt.

export interface NavLink {
  label: string;
  href: string;
  /** A second-level flyout (Webflow "inner dropdown"), e.g. Network Hardware → Internet Service Providers. */
  children?: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  /** Dropdown entries; absent = a plain link. */
  links?: NavLink[];
}

const about: NavLink[] = [
  { label: "About Us", href: "/about-us" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Lucca Data Vault", href: "/lucca-data-vault" },
  { label: "Speaking Engagements", href: "/speaking-engagements" },
  { label: "CE Accredited Course", href: "/ce-accredited-course" },
  { label: "Webinar Questions", href: "/webinar-questions" },
];

const you: NavLink[] = [
  { label: "Your Cyber Security Mindset", href: "/your-cyber-security-mindset" },
  { label: "10 Steps", href: "/10-steps" },
  { label: "Veterinary Data Protection", href: "/veterinary-data-protection" },
  { label: "Confidentiality", href: "/confidentiality" },
  { label: "Integrity", href: "/integrity" },
  { label: "Availability", href: "/availability" },
];

const itServices: NavLink[] = [
  { label: "Cloud & Local Practice Management Issues", href: "/services/cloud-local-practice-management-issues" },
  { label: "Computer Replacements", href: "/services/computer-replacements" },
  {
    label: "Network Hardware",
    href: "/services/network-hardware",
    children: [{ label: "Internet Service Providers", href: "/services/internet-service-providers" }],
  },
  { label: "Email Support", href: "/services/email-support" },
  { label: "Social Media Security and Recovery", href: "/services/social-media-security-and-recovery" },
  {
    label: "Dental X-Ray",
    href: "/services/dental-x-ray",
    children: [{ label: "X-Ray", href: "/services/x-ray" }],
  },
  { label: "File Sharing", href: "/services/file-sharing" },
  { label: "Server Replacement", href: "/services/server-replacement" },
  { label: "Fixing Printing Issues", href: "/services/fixing-printing-issues" },
  { label: "Team Chats", href: "/services/team-chats" },
];

const ebooks: NavLink[] = [
  { label: "Protecting Your Practice", href: "/ebook/5-steps-to-protect-your-practice" },
  { label: "Maintaining Digital Privacy", href: "/ebook/8-ways-to-maintain-digital-privacy" },
  { label: "Optimizing Technology", href: "/ebook/optimizing-it-infrastructure" },
];

export const headerNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us", links: about },
  { label: "You", href: "/your-cyber-security-mindset", links: you },
  { label: "IT Services", href: "/it-services", links: itServices },
  { label: "Cyber News", href: "/blog" },
  { label: "eBooks", href: "/ebooks", links: ebooks },
];

/** Footer columns. The IT Services column is the flat list (Webflow's Services CMS list). */
export const footerMenus: { title: string; href?: string; links: NavLink[]; cmsList?: boolean }[] = [
  { title: "About", href: "/about-us", links: about },
  { title: "You", href: "/your-cyber-security-mindset", links: you },
  {
    title: "IT Services",
    href: "/it-services",
    links: itServices.flatMap((l) => [{ label: l.label, href: l.href }, ...(l.children ?? [])]),
    cmsList: true, // rendered with Webflow's CMS-list markup, which spaces items differently
  },
  { title: "eBooks", href: "/ebooks", links: ebooks },
  { title: "Resources", links: [{ label: "Cyber News", href: "/blog" }] },
];

export const contactHref = "/contact-us";
/** "Schedule A Call" / "Schedule Consultation" — the live site's Calendly link. */
export const scheduleCallUrl = "https://calendly.com/lucca_vet/call?month=2021-09";
