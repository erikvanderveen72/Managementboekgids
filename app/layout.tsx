import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const SITE_URL = "https://managementboekgids.nl";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafaf7",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Managementboekgids, De beste managementboeken van Nederland",
    template: "%s · Managementboekgids",
  },
  description:
    "Samenvattingen, reviews en praktische lessen uit de beste managementboeken. Voor managers, ondernemers en professionals die willen groeien.",
  applicationName: "Managementboekgids",
  authors: [{ name: "Erik van der Veen" }],
  creator: "Erik van der Veen",
  publisher: "Managementboekgids",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Managementboekgids",
    url: SITE_URL,
    title: "Managementboekgids, De beste managementboeken van Nederland",
    description:
      "Samenvattingen, reviews en praktische lessen uit de beste managementboeken.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Managementboekgids",
    description:
      "Samenvattingen, reviews en praktische lessen uit de beste managementboeken.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Managementboekgids",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  founder: { "@type": "Person", name: "Erik van der Veen" },
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Managementboekgids",
  url: SITE_URL,
  inLanguage: "nl-NL",
  publisher: { "@type": "Organization", name: "Managementboekgids" },
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/boeken?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>
        <SiteHeader />
        <main className="min-h-[60vh]">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  );
}
