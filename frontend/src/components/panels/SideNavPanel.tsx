"use client";
import { CircleUserRound, Home, Shield, Flame, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useUserStore } from "@/store/userStore";

const NavLink = ({ icon: Icon, label, active }: { icon: React.ElementType, label: string, active?: boolean }) => (
  <Button variant={active ? "secondary" : "ghost"} className="w-full justify-start text-lg h-12 px-4">
    <Icon className="mr-4 h-6 w-6" />
    {label}
  </Button>
);

export const SideNavPanel = () => {
  const user = useUserStore(state => state.user);
  return (
    <div className="flex h-full flex-col p-6 bg-card rounded-xl shadow-lg border border-border/60">
      <div className="flex items-center gap-4 p-4 mb-6 bg-background rounded-lg shadow-sm">
        <CircleUserRound className="h-12 w-12 text-muted-foreground" />
        <div>
          <p className="text-xl font-bold text-foreground">{user?.name || "Guest User"}</p>
          <p className="text-sm text-muted-foreground">{user?.email || "Welcome"}</p>
        </div>
      </div>
      <nav className="flex flex-col gap-3">
        <NavLink icon={Home} label="Home" active />
        <NavLink icon={Shield} label="My Bets" />
        <NavLink icon={Flame} label="Live" />
      </nav>
      <div className="mt-auto">
        <Separator className="my-6 bg-border/60" />
        <NavLink icon={LogOut} label="Logout" />
      </div>
    </div>
  );
};