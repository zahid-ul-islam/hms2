// navbarItems.ts
import { IconType } from "react-icons";
import { Home, Info } from "lucide-react";

interface INavItem {
  name: string;
  icon?: IconType; 
  link?: string; 
  title?: string; 
}

export const navbarItems: INavItem[] = [
  {
    name: "Services",
    icon: Home,
    title: "Dashboard",
    link: "/services",
  },
  {
    name: "About",
    icon: Info,
    title: "About Us",
    link: "/about",
  },
  
];