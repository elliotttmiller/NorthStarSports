import { cn } from "@/lib/utils";


export const metadata = {
  title: "NorthStar Sports",
  description: "Polished, professional sports betting UI with custom dark theme.",
};

import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
  <body className={cn("min-h-screen bg-background font-sans antialiased")}> 
        {children}
      </body>
    </html>
  );
}
