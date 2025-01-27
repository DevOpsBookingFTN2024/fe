import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { uniqueId } from "lodash";

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

import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";

const Menuitems = () =>
  [
    {
      navlabel: true,
      subheader: "HOME",
    },
    {
      id: uniqueId(),
      title: "Home",
      icon: DashboardCustomizeOutlinedIcon,
      href: "/",
    },
    {
      navlabel: true,
      subheader: "SECOND",
    },
    {
      id: uniqueId(),
      title: "My accommodations",
      icon: QueryStatsIcon,
      href: "/my-accommodations",
    },
    {
      id: uniqueId(),
      title: "Reservations",
      icon: QueryStatsIcon,
      href: "/reservations",
    },
  ] as MenuitemsType[];

export default Menuitems;
