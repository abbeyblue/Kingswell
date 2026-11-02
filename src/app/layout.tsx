import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Providers } from "@/components/motion/Providers";
import { company } from "@/lib/content";

const display = Sora({ variable: "--font-display-face", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const body = Manrope({ variable: "--font-body", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Kingswell Orion Ltd — IT Consultancy, Software Quality Assurance & Regulatory Compliance",
    template: "%s — Kingswell Orion Ltd",
  },
  description: company.short,
  applicationName: company.name,
  openGraph: {
    type: "website",
    siteName: company.name,
    title: "Kingswell Orion Ltd",
    description: company.short,
    locale: "en_IE",
  },
};

export const viewport: Viewport = {
  themeColor: "#061324",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IE" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-svh">
        <Providers>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
