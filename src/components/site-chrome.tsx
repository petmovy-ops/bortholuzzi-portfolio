import Link from "next/link";
import { portfolioEntries } from "@/data";
import categories from "@/data/categories.json";

const social = [
  { label: "Behance", href: "https://www.behance.net/grandmondo", mark: "Be" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bortholuzzi/", mark: "in" },
  { label: "Vimeo", href: "https://vimeo.com/bortholuzzi", mark: "v" },
  { label: "Email", href: "mailto:raphael@bortholuzzi.com", mark: "✉" }
];
const navigationGroups = [
  { title: "WORK", href: "/work/", slugs: categories.work },
  { title: "ILLUSTRATION", href: "/illustrations/", slugs: categories.illustrations },
  { title: "ARCHIVE", href: "/archives/", slugs: categories.archives }
];

export function BrandMark() {
  return <Link href="/" className="brand-mark" aria-label="Bortholuzzi — home">
    <img src="/brand/rb-monogram.png" alt="RB — Raphael Truffi Bortholuzzi" width="544" height="470" />
  </Link>;
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return <div className="portfolio-layout">
    <aside className="portfolio-sidebar">
      <BrandMark />
      <nav className="side-navigation" aria-label="Portfolio projects">
        <Link className="side-page-link" href="/about/">About</Link>
        {navigationGroups.map(group => <section className="side-nav-group" key={group.title}>
          <Link className="side-label" href={group.href}>{group.title}</Link>
          <ul>{group.slugs.map(slug => {
            const entry=portfolioEntries.find(item=>item.slug===slug);
            return entry ? <li key={slug}><Link href={`/${slug}/`}>{entry.title}</Link></li> : null;
          })}</ul>
        </section>)}
        <Link className="side-page-link side-contact-link" href="/contact/">Contact</Link>
      </nav>
      <div className="social-links">{social.map(item => <a key={item.label} href={item.href} aria-label={item.label} title={item.label} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{item.mark}</a>)}</div>
    </aside>
    <div className="portfolio-main">{children}<footer className="portfolio-footer"><span>© {new Date().getFullYear()} Raphael Truffi Bortholuzzi</span><span>Independent portfolio</span></footer></div>
  </div>;
}

export function ProjectGrid({ slugs, entries, mediaBySlug }: { slugs: string[]; entries: {slug:string;title:string;type:string;vimeoIds:string[]}[]; mediaBySlug: Record<string,{src:string}[]> }) {
  const bySlug = new Map(entries.map(entry => [entry.slug, entry]));
  return <div className="editorial-grid">{slugs.map(slug => {
    const entry=bySlug.get(slug); if (!entry) return null;
    const cover=mediaBySlug[slug]?.[0]?.src;
    return <article className="editorial-card" key={slug}>
      <Link href={`/${slug}/`} className="editorial-card-link">
        <div className={`editorial-thumb${cover ? "" : " editorial-thumb-empty"}`}>
          {cover ? <img src={cover} alt={entry.title} loading="lazy" /> : <span>{entry.vimeoIds.length ? "Motion / Film" : "Selected work"}</span>}
        </div>
        <div className="editorial-caption"><span>{entry.title}</span></div>
      </Link>
    </article>;
  })}</div>;
}
