import type { PortfolioEntry } from "@/lib/types";
import catalog from "./projects.json";
import media from "./media.json";

export const portfolioEntries = catalog as PortfolioEntry[];
export const mediaBySlug = media as Record<string, PortfolioMedia[]>;

export function getMedia(slug: string) { return mediaBySlug[slug] ?? []; }

export function getEntry(slug: string) {
  return portfolioEntries.find((entry) => entry.slug === slug);
}

export const projectEntries = portfolioEntries.filter((entry) => entry.type === "project");
export const collectionEntries = portfolioEntries.filter((entry) => entry.type === "portfolio_collection");
export const showreelEntries = portfolioEntries.filter((entry) => entry.type === "showreel");
