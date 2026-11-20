import Link from "next/link";
import { projectEntries } from "@/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects in the Bortholuzzi portfolio."
};

export default function WorkPage() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <Link className="wordmark" href="/">BORTHOLUZZI</Link>
        <nav className="primary-nav" aria-label="Main navigation">
          <Link href="/work/" aria-current="page">Work</Link>
          <Link href="/showreel2016/">Showreels</Link>
          <Link href="/about/">About</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
      </header>
      <section className="page-intro">
        <p className="eyebrow">Portfolio archive</p>
        <h1>Work</h1>
        <p className="hero-note">{projectEntries.length} projects catalogued from the recovered archive.</p>
      </section>
      <section className="project-grid" aria-label="Projects">
        {projectEntries.map((project) => (
          <article className="project-card" key={project.slug}>
            <Link href={`/${project.slug}/`}>
              <span className="project-card-title">{project.title}</span>
              <span className="project-card-meta">
                {project.uniqueImageFiles > 0 ? `${project.uniqueImageFiles} mapped images` : "Video / archive record"}
              </span>
            </Link>
          </article>
        ))}
      </section>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Bortholuzzi</span><Link href="/">Home</Link></footer>
    </main>
  );
}
