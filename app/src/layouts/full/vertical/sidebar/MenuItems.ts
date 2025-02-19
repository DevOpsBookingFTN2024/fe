import ApartmentIcon from "@mui/icons-material/Apartment";
import SearchIcon from "@mui/icons-material/Search";
import { uniqueId } from "lodash";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import useAuthStore from "@stores/authStore"; // Import authentication store

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

const Menuitems = () => {
  const { isValid, user } = useAuthStore((state) => state);

  const menuItems: MenuitemsType[] = [
    {
      navlabel: true,
      subheader: "HOME",
    },
    {
      id: uniqueId(),
      title: "Accommodations",
      icon: SearchIcon,
      href: "/",
    },
    // {
    //   navlabel: true,
    //   subheader: "Info",
    // },
  ];

  if (isValid && user?.roles?.includes("ROLE_HOST")) {
    menuItems.push({
      id: uniqueId(),
      title: "My accommodations",
      icon: ApartmentIcon,
      href: "/my-accommodations",
    });
  }

  if (isValid) {
    menuItems.push({
      id: uniqueId(),
      title: "Reservations",
      icon: EventSeatIcon,
      href: "/reservations",
    });
  }

  return menuItems;
};

export default Menuitems;
