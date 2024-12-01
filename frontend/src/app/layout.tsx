import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/navbar';
export const metadata: Metadata = {
  title: "Search App"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"anonymous"}/>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
              rel="stylesheet"/>
    </head>
      <body >
          <Navbar></Navbar>
          {children}

      </body>
    </html>
  );
}

