import type { Metadata } from "next";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import Notification from "@/components/Notification";

export const metadata: Metadata = {
  title: "CrowdTrust",
  description:
    "Starter template for using thirdweb SDK with Next.js App router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-700">
        <ThirdwebProvider
        // clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID} // Set this in .env
        // activeChain={baseSepolia}
        > 
          <Navbar /><Notification />
          {children}
          <Toaster />
        </ThirdwebProvider>
      </body>
    </html>
  );
}