import Link from "next/link";

const social = [
  { label: "Behance", href: "https://www.behance.net/grandmondo", mark: "Be" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bortholuzzi/", mark: "in" },
  { label: "Vimeo", href: "https://vimeo.com/bortholuzzi", mark: "v" },
  { label: "Email", href: "mailto:raphael@bortholuzzi.com", mark: "✉" }
];

export function BrandMark() {
  return <Link href="/" className="brand-mark" aria-label="Bortholuzzi — home">
    <svg viewBox="0 0 100 100" role="img" aria-label="RB">
      <circle cx="50" cy="50" r="49" fill="#050505" />
      <text x="50" y="66" textAnchor="middle" fill="none" stroke="white" strokeWidth="1.8" fontFamily="Georgia,serif" fontSize="53" letterSpacing="-8">ℝB</text>
    </svg>
  </Link>;
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return <div className="portfolio-layout">
    <aside className="portfolio-sidebar">
      <BrandMark />
      <nav className="side-navigation" aria-label="Portfolio sections">
        <Link href="/about/">About</Link>
        <span className="side-label">Work</span><Link href="/work/">Selected work</Link>
        <span className="side-label">Illustrations</span><Link href="/illustrations/">Illustrations</Link>
        <span className="side-label">Archives</span><Link href="/archives/">Archives</Link>
        <span className="side-label">Contact</span><Link href="/contact/">Get in touch</Link>
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
