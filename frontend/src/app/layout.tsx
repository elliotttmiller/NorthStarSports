import { Inter } from "next/font/google";
import { ClientLayout } from "./ClientLayout";
import "@/globals.css";
import "@/index.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const fontSans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontSans.variable}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>NSSPORTSCLUB - Professional Sports Betting</title>
        <meta name="description" content="Professional sports betting platform" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/pwa-192x192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SidebarProvider>
          <AppSidebar aria-label="Sidebar navigation" role="complementary" />
          <main aria-label="Main content" role="main">
            <SidebarTrigger />
            <ClientLayout fontSans={fontSans.variable}>{children}</ClientLayout>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}