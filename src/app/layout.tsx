import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trak | Community-Driven Scam Alerts and Security Crowdsourcing",
  description:
    "A platform for community-driven scam alerts and security crowdsourcing. Stay informed, avoid scams, and navigate safely with user-reported threat updates and green zone recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <div className="flex justify-between max-w-6xl mx-auto">
          <div className="hidden sm:inline border-r h-screen"><Sidebar /></div>
          <div>{children}</div>
          <div>News</div>
        </div>
      </body>
    </html>
  );
}
