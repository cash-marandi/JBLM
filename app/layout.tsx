import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme-provider";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "JBLM Quantity Surveyors",
  description: "Welcome to JBLM Quantity Surveyors, your trusted partner in construction cost management and project success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navigation />
            {children}
            <Footer />
          </ThemeProvider>

      </body>
    </html>
  );
}
