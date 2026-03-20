import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://dezvoltator-ro.nicolae-valentin-dinca.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nicolae-Valentin Dinca - Portofoliu - Dezvoltator Imobiliar - România",
  description:
    "Website de prezentare pentru dezvoltatori imobiliari din România, cu pagini moderne pentru ansambluri rezidențiale, apartamente și conversii.",
  keywords: [
    "Nicolae-Valentin Dinca",
    "portofoliu dezvoltator imobiliar",
    "dezvoltator imobiliar România",
    "website imobiliare România",
    "landing page ansamblu rezidențial",
  ],
  openGraph: {
    title:
      "Nicolae-Valentin Dinca - Portofoliu - Dezvoltator Imobiliar - România",
    description:
      "Portofoliu web pentru promovarea proiectelor rezidențiale, apartamentelor și facilităților, cu structură modernă și clară.",
    locale: "ro_RO",
    type: "website",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nicolae-Valentin Dinca - Portofoliu Dezvoltator Imobiliar România",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Nicolae-Valentin Dinca - Portofoliu - Dezvoltator Imobiliar - România",
    description:
      "Website de prezentare pentru dezvoltatori imobiliari din România, cu focus pe conversii și design premium.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
