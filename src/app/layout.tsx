import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bortholuzzi.com"),
  title: {
    default: "Bortholuzzi — Portfolio",
    template: "%s — Bortholuzzi"
  },
  description: "Selected work and projects by Bortholuzzi.",
  openGraph: {
    type: "website",
    url: "https://www.bortholuzzi.com",
    siteName: "Bortholuzzi",
    title: "Bortholuzzi — Portfolio",
    description: "Selected work and projects by Bortholuzzi."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
