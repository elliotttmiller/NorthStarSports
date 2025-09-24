// Deprecated: SPA page. Safe to delete after migration to Next.js.

import { Card } from "@/components/ui/card";

export default function AccountPage() {
  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-muted/10">
      <div className="flex-1 min-h-0 h-full universal-responsive-container px-0 sm:px-4">
        <div className="pt-2 pb-24 sm:pb-4">
          <div className="max-w-2xl mx-auto px-4 py-8 md:px-0 md:py-12 flex flex-col gap-6 text-base">
            {/* Welcome Title */}
            <div className="w-full mb-8 md:mb-10">
              <div className="text-center md:text-left py-6 md:py-8 px-4 md:px-6">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-3">
                  Welcome, NorthStar User
                </h1>
                <div className="w-12 md:w-16 h-1 bg-accent mx-auto md:mx-0 rounded-full"></div>
              </div>
            </div>
            {/* Balance Card - Slim, professional, mobile-first */}
            <div className="w-full">
              <Card className="bg-card text-card-foreground border shadow-sm rounded-xl w-full max-w-full mx-auto p-0">
                <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-2 px-4 py-4">
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                      Balance
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-foreground">
                      $1,250.00
                    </span>
                  </div>
                  <div className="flex flex-row gap-4 mt-2 sm:mt-0">
                    <div className="flex flex-col items-center sm:items-end">
                      <span className="text-xs text-muted-foreground">
                        Available
                      </span>
                      <span className="font-semibold text-foreground">
                        $1,000.00
                      </span>
                    </div>
                    <div className="flex flex-col items-center sm:items-end">
                      <span className="text-xs text-muted-foreground">
                        Risk
                      </span>
                      <span className="font-semibold text-foreground">
                        $250.00
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            {/* Add more slim, professional components here as needed */}
            {/* Bottom spacing for smooth scroll */}
            <div className="h-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
