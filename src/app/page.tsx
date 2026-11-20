import Link from "next/link";

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Bortholuzzi home">
          BORTHOLUZZI
        </Link>
        <nav className="primary-nav" aria-label="Main navigation">
          <Link href="/work/">Work</Link>
          <Link href="/showreels/">Showreels</Link>
          <Link href="/about/">About</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Portfolio</p>
        <h1 id="hero-title">Selected work.</h1>
        <p className="hero-note">
          A curated archive of projects, images and moving work.
        </p>
        <Link className="text-link" href="/work/">
          Explore work <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Bortholuzzi</span>
        <span>Independent portfolio</span>
      </footer>
    </main>
  );
}
