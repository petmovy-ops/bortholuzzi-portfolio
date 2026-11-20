import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEntry, getMedia, portfolioEntries } from "@/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioEntries.filter((entry) => entry.slug !== "work").map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};
  return {
    title: entry.title,
    alternates: { canonical: entry.canonicalUrl },
    openGraph: { title: entry.title, url: entry.canonicalUrl, type: "article" }
  };
}

export default async function ArchiveEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();
  const media = getMedia(slug);

  return (
    <main className="site-shell">
      <header className="site-header">
        <Link className="wordmark" href="/">BORTHOLUZZI</Link>
        <nav className="primary-nav" aria-label="Main navigation">
          <Link href="/work/">Work</Link>
          <Link href="/showreel2016/">Showreels</Link>
          <Link href="/about/">About</Link>
          <Link href="/contact/">Contact</Link>
        </nav>
      </header>
      <article className="detail-page">
        <p className="eyebrow">{entry.type.replaceAll("_", " ")}</p>
        <h1>{entry.title}</h1>
        {entry.vimeoIds.length > 0 ? (
          <div className="video-stack">
            {entry.vimeoIds.map((id) => (
              <div className="video-frame" key={id}>
                <iframe
                  src={`https://player.vimeo.com/video/${encodeURIComponent(id)}`}
                  title={`${entry.title} — Vimeo video`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ) : null}
        {media.length > 0 ? (
          <section className="media-gallery" aria-label={`Images for ${entry.title}`}>
            {media.map((asset, index) => (
              <figure className="media-gallery-item" key={asset.file}>
                {/* Local static path and project association come from the audited PROJECTS_INDEX image_files list. */}
                <img src={asset.src} alt="" loading={index < 2 ? "eager" : "lazy"} decoding="async" />
              </figure>
            ))}
          </section>
        ) : null}
        <dl className="archive-facts">
          <div><dt>Images referenced</dt><dd>{entry.imageReferences}</dd></div>
          <div><dt>Verified mapped images</dt><dd>{media.length}</dd></div>
          <div><dt>Vimeo references</dt><dd>{entry.vimeoIds.length}</dd></div>
        </dl>
        <p className="archive-note">
          This page uses media with an explicit project reference in the recovered archive.
          Original descriptions, credits and editorial relationships remain pending source-content verification.
        </p>
        <Link className="text-link" href="/work/">← Back to Work</Link>
      </article>
      <footer className="site-footer"><span>© {new Date().getFullYear()} Bortholuzzi</span><Link href="/">Home</Link></footer>
    </main>
  );
}
