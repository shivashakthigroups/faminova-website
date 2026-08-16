import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://faminova.in"),

  title: {
    default: "FamiNova",
    template: "%s | FamiNova",
  },

  description:
    "FamiNova provides digital educational and membership services with secure account access, membership management and payment verification.",

  applicationName: "FamiNova",

  keywords: [
    "FamiNova",
    "family wellness",
    "fertility education",
    "digital membership",
    "membership services",
    "family education",
  ],

  authors: [
    {
      name: "FamiNova",
    },
  ],

  creator: "FamiNova",

  publisher: "FamiNova",

  alternates: {
    canonical: "https://faminova.in",
  },

  openGraph: {
    title: "FamiNova",
    description:
      "Digital educational and membership services from FamiNova.",
    url: "https://faminova.in",
    siteName: "FamiNova",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FamiNova",
    description:
      "Digital educational and membership services from FamiNova.",
  },

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}