// navbarItems.ts
import { IconType } from "react-icons";
import { Home, Info, User } from "lucide-react";

interface INavItem {
  name: string;
  icon?: IconType; 
  link?: string; 
  title?: string; 
  dropdown?: {
    items: {
      name: string;
      link: string;
      icon?: IconType;
    }[];
  };
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
  {
    name: "Profile",
    icon: User,
    title: "Profile",
    dropdown: {
      items: [
        {
          name: "Your Orders",
          link: "/orders",
          icon: User,
        },
      ],
    },
  },
];