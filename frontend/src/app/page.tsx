import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome, NorthStar User</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Stats Section */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Balance</span>
                <span className="font-mono font-semibold">$1,250.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-mono font-semibold">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Bets</span>
                <span className="font-mono font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">This Week</span>
                <span className="font-mono font-semibold text-win">+$340</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Games Section */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trending Live Games</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Game 1 */}
              <div>
                <p className="text-sm text-muted-foreground">NBA | LIVE | 8:00 PM EST</p>
                <p className="text-xl font-semibold">Warriors @ Lakers</p>
              </div>
              <Separator />
              {/* Game 2 */}
              <div>
                <p className="text-sm text-muted-foreground">NFL | 1:00 PM EST</p>
                <p className="text-xl font-semibold">Bills @ Chiefs</p>
              </div>
              <Separator />
              <div className="pt-2">
                <Button variant="secondary" className="w-full">
                  View All Sports & Games
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
