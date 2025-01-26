import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PageContainer from "@ui/container/PageContainer";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import { Reservation } from "@api/accommodations/reservations";
import ReservationsList from "./ReservationsList";
import AcceptedReservationsTab from "./AcceptedReservationsTab";
import { useQuery } from "@tanstack/react-query";
import { getSelectAccommodations } from "@api/accommodations/accommodations";
import PendingReservationsTab from "./PendingReservationsTab";
import HistoryReservationsTab from "./HistoryReservationsTab";

export const reservations: Reservation[] = [
  {
    id: "resv1",
    accommodation: {
      id: "acc1",
      name: "Seaside Villa",
      address: "123 Ocean Drive",
      city: "Miami",
      country: "USA",
      minimumGuests: 2,
      maximumGuests: 8,
      host: "John Doe",
      hostScore: 4.8,
      pricingStrategy: "PER_UNIT",
      approvalStrategy: "AUTOMATIC",
      facilities: [
        { id: "fac1", name: "Pool" },
        { id: "fac2", name: "Wi-Fi" },
        { id: "fac3", name: "Parking" },
      ],
      photos: [
        { id: "photo1", url: "villa1.jpg" },
        { id: "photo2", url: "villa2.jpg" },
      ],
    },
    dateFrom: new Date("2024-06-15"),
    dateTo: new Date("2024-06-20"),
    reservationStatus : "PASSED",
    numberOfGuests: 4,
    priceAll: 1500,
  },
  {
    id: "resv2",
    accommodation: {
      id: "acc2",
      name: "Mountain Cabin",
      address: "789 Pine Road",
      city: "Aspen",
      country: "USA",
      minimumGuests: 1,
      maximumGuests: 5,
      host: "Jane Smith",
      hostScore: 4.5,
      pricingStrategy: "PER_GUEST",
      approvalStrategy: "MANUAL",
      facilities: [
        { id: "fac4", name: "Fireplace" },
        { id: "fac2", name: "Wi-Fi" },
        { id: "fac5", name: "Hot Tub" },
      ],
      photos: [
        { id: "photo3", url: "cabin1.jpg" },
        { id: "photo4", url: "cabin2.jpg" },
      ],
    },
    reservationStatus : "DECLINED",
    dateFrom: new Date("2024-12-01"),
    dateTo: new Date("2024-12-05"),
    numberOfGuests: 2,
    priceAll: 800,
  },
  {
    id: "resv3",
    accommodation: {
      id: "acc3",
      name: "Urban Apartment",
      address: "456 Main Street",
      city: "New York",
      country: "USA",
      minimumGuests: 1,
      maximumGuests: 3,
      host: "Alex Johnson",
      hostScore: 4.9,
      pricingStrategy: "PER_UNIT",
      approvalStrategy: "AUTOMATIC",
      facilities: [
        { id: "fac2", name: "Wi-Fi" },
        { id: "fac6", name: "Elevator" },
        { id: "fac7", name: "Gym" },
      ],
      photos: [
        { id: "photo5", url: "apartment1.jpg" },
        { id: "photo6", url: "apartment2.jpg" },
      ],
    },
    reservationStatus : "CANCELLED",
    dateFrom: new Date("2024-03-10"),
    dateTo: new Date("2024-03-15"),
    numberOfGuests: 3,
    priceAll: 1200,
  },
  {
    id: "resv4",
    accommodation: {
      id: "acc4",
      name: "Country House",
      address: "321 Meadow Lane",
      city: "Nashville",
      country: "USA",
      minimumGuests: 4,
      maximumGuests: 10,
      host: "Emily Brown",
      hostScore: 4.7,
      pricingStrategy: "PER_UNIT",
      approvalStrategy: "MANUAL",
      facilities: [
        { id: "fac8", name: "Garden" },
        { id: "fac9", name: "BBQ" },
        { id: "fac2", name: "Wi-Fi" },
      ],
      photos: [
        { id: "photo7", url: "house1.jpg" },
        { id: "photo8", url: "house2.jpg" },
      ],
    },
    reservationStatus : "PASSED",
    dateFrom: new Date("2024-07-01"),
    dateTo: new Date("2024-07-07"),
    numberOfGuests: 6,
    priceAll: 2000,
  },
  {
    id: "resv5",
    accommodation: {
      id: "acc5",
      name: "Lakefront Cottage",
      address: "654 Lakeview Drive",
      city: "Lake Tahoe",
      country: "USA",
      minimumGuests: 2,
      maximumGuests: 6,
      host: "Michael Green",
      hostScore: 4.6,
      pricingStrategy: "PER_GUEST",
      approvalStrategy: "AUTOMATIC",
      facilities: [
        { id: "fac10", name: "Kayaks" },
        { id: "fac11", name: "Fire Pit" },
        { id: "fac2", name: "Wi-Fi" },
      ],
      photos: [
        { id: "photo9", url: "cottage1.jpg" },
        { id: "photo10", url: "cottage2.jpg" },
      ],
    },
    dateFrom: new Date("2024-08-10"),
    dateTo: new Date("2024-08-15"),
    numberOfGuests: 5,
    priceAll: 1800,
  },
];

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
