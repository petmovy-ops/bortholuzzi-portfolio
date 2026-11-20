import Link from "next/link";
import { projectEntries } from "@/data";

export default function HomePage() {
  const featured = projectEntries.filter((project) => project.uniqueImageFiles > 0).slice(0, 6);
  return (
    <main className="site-shell">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Bortholuzzi home">BORTHOLUZZI</Link>
        <nav className="primary-nav" aria-label="Main navigation">
          <Link href="/work/">Work</Link>
          <Link href="/showreel2016/">Showreels</Link>
          <Link href="/about/">About</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
      </header>
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Portfolio / Selected work</p>
        <h1 id="hero-title">Image, motion &amp; visual worlds.</h1>
        <p className="hero-note">A portfolio archive of projects, images and moving work.</p>
        <Link className="text-link" href="/work/">Explore all work ↗</Link>
      </section>
      <section className="home-selection">
        <div className="section-heading"><p className="eyebrow">From the archive</p><Link className="text-link" href="/work/">All projects ↗</Link></div>
        <div className="home-project-grid">
          {featured.map((project) => (
            <Link className="home-project" href={`/${project.slug}/`} key={project.slug}>
              <span>{project.title}</span><small>{project.uniqueImageFiles} mapped images</small>
            </Link>
          ))}
        </div>
      </section>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Bortholuzzi</span><span>Independent portfolio</span></footer>
    </main>
  );
}
