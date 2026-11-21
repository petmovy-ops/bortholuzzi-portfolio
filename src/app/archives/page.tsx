import { SiteChrome, ProjectGrid } from "@/components/site-chrome";
import { portfolioEntries, mediaBySlug } from "@/data";
import categories from "@/data/categories.json";
export const metadata = { title: "Archives", description: "Selected archive projects and experiments." };
export default function ArchivesPage(){return <SiteChrome><main className="portfolio-content category-content">
  <p className="eyebrow">Portfolio / Archive</p><h1 className="category-title">Archives</h1><ProjectGrid slugs={categories.archives} entries={portfolioEntries} mediaBySlug={mediaBySlug}/>
</main></SiteChrome>}
