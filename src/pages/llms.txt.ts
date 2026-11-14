// Dynamic endpoint (not a static public/llms.txt) so it's generated from the same config singleton and
// content as the rest of the site, per Skeleton-Build-Spec.md §10.
// Lucca: the pages and IT services are the ported Webflow pages (src/webflow/pages.json), not the Skeleton
// services collection, so they are listed from there, with each page's live title and meta description.
import type { APIRoute } from "astro";
import { getSiteInfo } from "../lib/data/site";
import { webflowPages } from "../lib/webflow";

const MAIN_PAGES = ["/about-us", "/it-services", "/testimonials", "/case-studies", "/lucca-data-vault", "/ebooks", "/contact-us", "/book-a-call", "/blog"];

export const GET: APIRoute = async ({ site }) => {
  const base = site!;
  const url = (path: string) => new URL(path, base).href;
  const siteInfo = await getSiteInfo();
  const entry = (route: string) => {
    const m = webflowPages[route];
    if (!m) return undefined;
    const name = m.title.split("|")[0].trim();
    return `- [${name}](${url(route)})${m.description ? `: ${m.description}` : ""}`;
  };

  const lines: string[] = [];
  lines.push(`# ${siteInfo.practiceName}`);
  lines.push("");
  const summary = siteInfo.businessDescription || "IT support and data security for veterinary practices.";
  lines.push(`> ${summary}${siteInfo.phoneNumber ? ` · ${siteInfo.phoneNumber}` : ""}`);
  lines.push("");

  lines.push("## Pages");
  lines.push(`- [Home](${url("/")})`);
  for (const r of MAIN_PAGES) { const l = entry(r); if (l) lines.push(l); }
  lines.push("");

  const services = Object.keys(webflowPages).filter((r) => r.startsWith("/services/")).sort();
  if (services.length) {
    lines.push("## IT Services");
    for (const r of services) { const l = entry(r); if (l) lines.push(l); }
    lines.push("");
  }

  const body = lines.join("\n").trimEnd() + "\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
