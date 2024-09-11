import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProviders } from "@/components/theme/ThemeProviders";
import { ReduxProviders } from "@/redux/ReduxProviders";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Boiler plate",
  description: "Your mighty boiler created my mighty boateng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground bg-background`}
      >
        <ReduxProviders>
          <ThemeProviders attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProviders>
        </ReduxProviders>
      </body>
    </html>
  );
}
