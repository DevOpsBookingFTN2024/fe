import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PageContainer from "@ui/container/PageContainer";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import AcceptedReservationsTab from "./AcceptedReservationsTab";
import { useQuery } from "@tanstack/react-query";
import { getSelectAccommodations } from "@api/accommodations/accommodations";
import PendingReservationsTab from "./PendingReservationsTab";
import HistoryReservationsTab from "./HistoryReservationsTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, pt: 1 }}>{children}</Box>}
    </div>
  );
}

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "My reservations",
  },
];

const ReservationsPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data: selectAccommodations } = useQuery({
    queryKey: ["select_accommodations"],
    queryFn: async () => {
      return getSelectAccommodations();
    },
  });
  return (
    <PageContainer title="Reservations" description="this is Reservations page">
      {/* breadcrumb */}
      <Breadcrumb title="Reservations" items={BCrumb} />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="Active" {...a11yProps(0)} />
            <Tab label="Pending" {...a11yProps(1)} />
            <Tab label="History" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AcceptedReservationsTab
            selectAccommodations={selectAccommodations}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <PendingReservationsTab selectAccommodations={selectAccommodations} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <HistoryReservationsTab selectAccommodations={selectAccommodations} />
        </CustomTabPanel>
      </Box>
    </PageContainer>
  );
};

export default ReservationsPage;
