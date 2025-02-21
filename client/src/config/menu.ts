import { Home, User, type LucideIcon } from "lucide-react";

export type MenuConfig = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

export const menu: MenuConfig[] = [
  {
    label: "Home",
    value: "home",
    href: "/",
    icon: Home,
  },
  {
    label: "Profile",
    value: "profile",
    href: "/profile",
    icon: User,
  },
];
