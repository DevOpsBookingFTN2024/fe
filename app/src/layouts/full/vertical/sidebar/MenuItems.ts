import { uniqueId } from "lodash";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

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

import { IconBasket, IconFile } from "@tabler/icons-react";
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
      title: "Second",
      icon: QueryStatsIcon,
      href: "/akoma-judgments",
    },
  ] as MenuitemsType[];

export default Menuitems;
