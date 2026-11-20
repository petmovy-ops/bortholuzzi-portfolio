import { SiteChrome, ProjectGrid } from "@/components/site-chrome";
import { portfolioEntries, mediaBySlug } from "@/data";
import categories from "@/data/categories.json";
export const metadata = { title: "Work", description: "Selected visual, motion and design projects by Raphael Truffi Bortholuzzi." };
export default function WorkPage(){return <SiteChrome><main className="portfolio-content category-content">
  <p className="eyebrow">Portfolio / Selected work</p><h1 className="category-title">Work</h1><p className="category-intro">Motion design, visual identity, campaigns and moving image.</p>
  <ProjectGrid slugs={categories.work} entries={portfolioEntries} mediaBySlug={mediaBySlug}/>
</main></SiteChrome>}
