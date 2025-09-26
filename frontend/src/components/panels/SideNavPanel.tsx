"use client";
import { useUserStore } from "@/store/userStore";
import { CircleUserRound, Home, Shield, Flame, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavLink = ({ icon: Icon, label, active }: { icon: React.ElementType, label: string, active?: boolean }) => (
  <Button variant={active ? "secondary" : "ghost"} className="w-full justify-start text-lg h-12 px-4">
    <Icon className="mr-4 h-6 w-6" />
    {label}
  </Button>
);

export const SideNavPanel = () => {
  const user = useUserStore((state) => state.user);
  if (!user) {
    return <Skeleton className="h-16 w-full rounded-xl" />;
  }
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex items-center gap-3 p-4 mb-4">
        <Avatar>
          <AvatarImage src={user.avatar || undefined} alt={user.name || "User"} />
          <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xl font-bold text-foreground">{user?.name || "Guest User"}</p>
          <p className="text-sm text-muted-foreground">{user?.email || "Welcome"}</p>
        </div>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink icon={Home} label="Home" active />
        <NavLink icon={Shield} label="My Bets" />
        <NavLink icon={Flame} label="Live" />
      </nav>
      <div className="mt-auto">
        <Separator className="my-4 bg-border/60" />
        <NavLink icon={LogOut} label="Logout" />
      </div>
    </div>
  );
};