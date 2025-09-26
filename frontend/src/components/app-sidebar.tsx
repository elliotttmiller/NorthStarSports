import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, Flame, Shield, LogOut, Trophy, Circle, Wallet } from "lucide-react";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Live", url: "/live", icon: Flame },
  { title: "My Bets", url: "/my-bets", icon: Shield },
  { title: "Logout", url: "/logout", icon: LogOut },
];

const sportsItems = [
  { title: "Football", url: "/games?league=football", icon: Trophy },
  { title: "Basketball", url: "/games?league=basketball", icon: Circle },
  { title: "Hockey", url: "/games?league=hockey", icon: Circle },
];

export function AppSidebar(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar" {...props}>
      <SidebarHeader>
        <span className="font-bold text-lg">NorthStar Sports</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sports</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sportsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Betslip</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/my-bets" className="flex items-center gap-2">
                    <Wallet size={20} />
                    <span>View Bet Slip</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span className="text-xs text-muted-foreground">© 2025 NorthStar Sports</span>
      </SidebarFooter>
    </Sidebar>
  );
}
