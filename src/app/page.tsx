export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Bortholuzzi home">
          BORTHOLUZZI
        </a>
        <nav className="primary-nav" aria-label="Main navigation">
          <a href="/work/">Work</a>
          <a href="/showreels/">Showreels</a>
          <a href="/about/">About</a>
          <a href="/contact/">Contact</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Portfolio</p>
        <h1 id="hero-title">Selected work.</h1>
        <p className="hero-note">
          A curated archive of projects, images and moving work.
        </p>
        <a className="text-link" href="/work/">
          Explore work <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Bortholuzzi</span>
        <span>Independent portfolio</span>
      </footer>
    </main>
  );
}
