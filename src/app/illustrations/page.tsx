import { SiteChrome, ProjectGrid } from "@/components/site-chrome";
import { portfolioEntries, mediaBySlug } from "@/data";
import categories from "@/data/categories.json";
export const metadata = { title: "Illustrations", description: "Illustration and visual art by Raphael Truffi Bortholuzzi." };
export default function IllustrationsPage(){return <SiteChrome><main className="portfolio-content category-content">
  <p className="eyebrow">Portfolio / Illustration</p><h1 className="category-title">Illustrations</h1><ProjectGrid slugs={categories.illustrations} entries={portfolioEntries} mediaBySlug={mediaBySlug}/>
</main></SiteChrome>}
