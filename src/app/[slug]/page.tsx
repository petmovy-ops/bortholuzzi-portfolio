import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEntry, getMedia, portfolioEntries } from "@/data";
import { SiteChrome } from "@/components/site-chrome";
export const dynamicParams = false;
export function generateStaticParams(){return portfolioEntries.filter(e=>!["work","about","contact","illustrations","archives"].includes(e.slug)).map(e=>({slug:e.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const e=getEntry(slug);if(!e)return {};return {title:e.title,description:e.description?.[1] ?? e.description?.[0],alternates:{canonical:e.canonicalUrl},openGraph:{title:e.title,description:e.description?.[1] ?? e.description?.[0],url:e.canonicalUrl,type:"article"}};}
export default async function ArchiveEntryPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const entry=getEntry(slug);if(!entry)notFound();const media=getMedia(slug);return <SiteChrome><main className="portfolio-content detail-content">
  <p className="eyebrow">{entry.type==="showreel"?"Showreel":"Selected project"}</p><h1 className="category-title">{entry.title}</h1>
  {entry.description&&entry.description.length>0&&<section className="project-description" aria-label={`Description of ${entry.title}`}>{entry.description.map((paragraph,i)=><p key={i}>{paragraph}</p>)}</section>}
  {(entry.embedUrl || (entry.embedUrls?.length ?? 0)>0 || entry.vimeoIds.length>0)&&<div className="video-stack">{entry.embedUrl&&<div className="video-frame"><iframe src={entry.embedUrl} title={`${entry.title} — video player`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy"/></div>}{entry.embedUrls?.map((url,i)=><div className="video-frame" key={url}><iframe src={url} title={`${entry.title} — video ${i+1}`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy"/></div>)}{entry.vimeoIds.map(id=><div className="video-frame" key={id}><iframe src={`https://player.vimeo.com/video/${encodeURIComponent(id)}`} title={`${entry.title} — Vimeo video`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy"/></div>)}</div>}
  {media.length>0&&<section className="media-gallery" aria-label={`Images for ${entry.title}`}>{media.map((asset,i)=><figure className="media-gallery-item" key={asset.file}><img src={asset.src} alt={`${entry.title} — image ${i+1}`} loading={i<2?"eager":"lazy"} decoding="async"/></figure>)}</section>}
  <Link className="text-link" href="/work/">← Back to Work</Link>
</main></SiteChrome>}
