import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://managementboekgids.nl"),
  title: {
    default: "Managementboekgids — De beste managementboeken van Nederland",
    template: "%s · Managementboekgids",
  },
  description:
    "Samenvattingen, reviews en praktische lessen uit de beste managementboeken. Voor managers, ondernemers en professionals die willen groeien.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Managementboekgids",
  },
  robots: { index: true, follow: true },
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
      </body>
    </html>
  );
}
