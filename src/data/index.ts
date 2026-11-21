import type { PortfolioEntry, PortfolioMedia } from "@/lib/types";
import catalog from "./projects.json";
import descriptions from "./descriptions.json";
import media from "./media.json";
import thumbnails from "./thumbnails.json";
const descriptionsBySlug = descriptions as Record<string, string[]>;
export const portfolioEntries = (catalog as PortfolioEntry[]).map((entry) => ({
  ...entry,
  description: descriptionsBySlug[entry.slug],
}));
export const mediaBySlug = media as Record<string, PortfolioMedia[]>;
export const thumbnailBySlug = thumbnails as Record<string, string>;
export function getMedia(slug: string) { return mediaBySlug[slug] ?? []; }
export function getEntry(slug: string) { return portfolioEntries.find((entry) => entry.slug === slug); }
export const projectEntries = portfolioEntries.filter((entry) => entry.type === "project");
export const collectionEntries = portfolioEntries.filter((entry) => entry.type === "portfolio_collection");
export const showreelEntries = portfolioEntries.filter((entry) => entry.type === "showreel");
