import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProviders";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Codevue - Interview Platform",
  description: "Manage your technical interviews effectively",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexClerkProvider>
      <html lang="en" className="dark">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SignedIn>
              <div className="min-h-screen">
                <Navbar />
                <main className="px-4 sm:px-6 lg:px-8">{children}</main>
              </div>
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </ThemeProvider>
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
