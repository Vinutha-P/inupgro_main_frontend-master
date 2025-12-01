import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./ClientWrapper";
import Notification from "../components/Notification";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Inupgro",
  description: "Welcome to our website!",
  // openGraph: {
  //   title: "Your Company Name",
  //   description: "We deliver top-tier services.",

  //   url: "https://yourdomain.com",
  //   siteName: "Your Company Name",
  //   images: [
  //     {
  //       url: "https://yourdomain.com/logo.png", 
  //       width: 1200,
  //       height: 630,
  //       alt: "Your Company Logo",
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Your Company Name",
  //   description: "We deliver top-tier services.",
  //   images: ["https://yourdomain.com/logo.png"],
  // },
  icons: {
    icon: '/Frame.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexSans.variable} antialiased`}>
        <ClientWrapper>
          {children}
          <Notification />
        </ClientWrapper>
      </body>
    </html>
  );
}
