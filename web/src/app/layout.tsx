import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bengal Sky • বাংলাদেশ ওয়েদার",
  description: "Mobile-first weather web application built exclusively for Bangladesh with administrative hierarchy, monsoon rainfall, AQI, and Bengali seasons.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bengal Sky",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E3B43",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased selection:bg-marigold selection:text-indigo-deep">
        {children}
      </body>
    </html>
  );
}
