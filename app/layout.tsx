import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "4Dogs Grooming | Professional Dog Grooming in Fort Worth, TX",
  description:
    "4Dogs Grooming offers professional dog grooming services in Fort Worth, TX. Easy online booking, full grooming packages, bath & brush, nail trim, deshedding, and more. Family-owned, gentle, and experienced care for your pet.",

  keywords: [
    "dog grooming Fort Worth",
    "pet grooming Fort Worth",
    "dog groomer near me",
    "dog grooming services",
    "groomer Fort Worth Texas",
    "pet care Fort Worth",
    "4Dogs Grooming",
    "dog bath and brush",
    "nail trim for dogs",
    "deshedding service dogs",
    "local groomer Fort Worth",
  ],

  openGraph: {
    title: "4Dogs Grooming | Book Professional Dog Grooming in Fort Worth",
    description:
      "Professional, gentle, and family-owned dog grooming in Fort Worth, TX. Book online in seconds with 4Dogs Grooming.",
    url: "https://4dogsgrooming.org",
    siteName: "4Dogs Grooming",
    images: [
      {
        url: "https://4dogsgrooming.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "4Dogs Grooming – Professional Dog Grooming in Fort Worth",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "4Dogs Grooming | Dog Groomer in Fort Worth, TX",
    description:
      "Book professional and gentle grooming services for your dog at 4Dogs Grooming. Easy online booking and experienced groomers.",
    images: ["https://4dogsgrooming.org/og-image.png"],
  },

  authors: [{ name: "4Dogs Grooming" }],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="4Dogs">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <NavBar />

            {children}

            <Footer />
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
