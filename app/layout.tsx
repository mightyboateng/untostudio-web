import type { Metadata } from "next";
import "./globals.css";
import { ThemeProviders } from "@/components/theme/ThemeProviders";
import { ReduxProviders } from "@/redux/ReduxProviders";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased text-foreground bg-background`}>
        <ThemeProviders attribute="class" defaultTheme="system" enableSystem>
          <ReduxProviders>
            {children}
            <Toaster />
          </ReduxProviders>
        </ThemeProviders>
      </body>
    </html>
  );
}
