import Link from "next/link";
import { SiteChrome, ProjectGrid } from "@/components/site-chrome";
import { projectEntries, mediaBySlug } from "@/data";
import categories from "@/data/categories.json";

export default function HomePage() {
  return <SiteChrome><main className="portfolio-content home-content">
    <p className="eyebrow">Portfolio / Selected work</p>
    <h1 className="home-title">Image, motion &amp;<br/>visual worlds.</h1>
    <p className="home-intro">A multidisciplinary visual practice across image, motion, design and physical storytelling.</p>
    <Link className="text-link" href="/work/">Explore selected work ↗</Link>
    <section className="home-selection"><div className="section-heading"><p className="eyebrow">Selected projects</p><Link href="/work/">All work ↗</Link></div>
      <ProjectGrid slugs={categories.work.slice(0,6)} entries={projectEntries} mediaBySlug={mediaBySlug}/>
    </section>
    <section className="home-categories"><Link href="/work/">Work <span>↗</span></Link><Link href="/illustrations/">Illustrations <span>↗</span></Link><Link href="/archives/">Archives <span>↗</span></Link></section>
  </main></SiteChrome>;
}
