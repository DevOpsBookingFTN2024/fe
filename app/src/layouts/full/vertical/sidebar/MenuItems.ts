import ApartmentIcon from "@mui/icons-material/Apartment";
import SearchIcon from "@mui/icons-material/Search";
import { uniqueId } from "lodash";
import EventSeatIcon from "@mui/icons-material/EventSeat";

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

const Menuitems = () =>
  [
    {
      navlabel: true,
      subheader: "HOME",
    },
    {
      id: uniqueId(),
      title: "Home",
      icon: SearchIcon,
      href: "/",
    },
    {
      navlabel: true,
      subheader: "SECOND",
    },
    {
      id: uniqueId(),
      title: "My accommodations",
      icon: ApartmentIcon,
      href: "/my-accommodations",
    },
    {
      id: uniqueId(),
      title: "Reservations",
      icon: EventSeatIcon,
      href: "/reservations",
    },
  ] as MenuitemsType[];

export default Menuitems;
