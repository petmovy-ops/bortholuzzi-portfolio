export type PageType = "project" | "portfolio_collection" | "showreel" | "site_page";

export interface PortfolioEntry {
  slug: string;
  title: string;
  type: PageType;
  canonicalUrl: string;
  sourcePath: string;
  migrationAction: string;
  navigation: string;
  imageReferences: number;
  uniqueImageFiles: number;
  vimeoIds: string[];
  mediaAudit: {
    directAssetFiles: number;
    sourcePageAssets: number;
    missingAssets: number;
  };
  auditStatus: string;
}


export interface PortfolioMedia {
  file: string;
  src: string;
}
