import React from "react";
import { Box } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import AppCard from "@ui/shared/AppCard";
import AccommodationsList from "../../components/ui/shared/AccommodationsList";
import { Accommodation } from "@api/accommodations/accommodations";

const mockAccommodations: Accommodation[] = [
  {
    id: "1",
    name: "Sunny Beach Resort",
    address: "Coastal Road 21",
    city: "Split",
    country: "Croatia",
    minimumGuests: 2,
    maximumGuests: 8,
    hostScore: 4.5,
    pricingStrategy: "PER_UNIT",
    approvalStrategy: "MANUAL",
    facilities: [
      { id: "1", name: "Wi-Fi" },
      { id: "2", name: "Swimming Pool" },
      { id: "3", name: "Gym" },
    ],
  },
  {
    id: "2",
    name: "Mountain Retreat",
    address: "Highway 88",
    city: "Zlatibor",
    country: "Serbia",
    minimumGuests: 4,
    maximumGuests: 12,
    hostScore: 4.5,
    pricingStrategy: "PER_GUEST",
    approvalStrategy: "AUTOMATIC",
    facilities: [
      { id: "4", name: "Fireplace" },
      { id: "5", name: "Hot Tub" },
    ],
  },
  {
    id: "3",
    name: "Urban Stay",
    address: "City Center 14",
    city: "Zagreb",
    country: "Croatia",
    minimumGuests: 1,
    maximumGuests: 4,
    pricingStrategy: "PER_GUEST",
    approvalStrategy: "MANUAL",
    hostScore: 4.5,
    facilities: [
      { id: "6", name: "Parking Lot" },
      { id: "7", name: "Air Conditioning" },
      { id: "8", name: "Breakfast Included" },
    ],
  },
  {
    id: "4",
    name: "Lakeview Lodge",
    address: "Lakeside Drive 3",
    city: "Bled",
    country: "Slovenia",
    minimumGuests: 3,
    maximumGuests: 10,
    pricingStrategy: "PER_UNIT",
    approvalStrategy: "AUTOMATIC",
    hostScore: 4.5,
    facilities: [
      { id: "9", name: "Wi-Fi" },
      { id: "10", name: "Pet Friendly" },
      { id: "11", name: "BBQ Area" },
    ],
  },
  {
    id: "5",
    name: "Cozy Cabin",
    address: "Forest Path 7",
    city: "Plitvice",
    country: "Croatia",
    minimumGuests: 2,
    maximumGuests: 5,
    hostScore: 4.5,
    pricingStrategy: "PER_UNIT",
    approvalStrategy: "MANUAL",
    facilities: [
      { id: "12", name: "Wi-Fi" },
      { id: "13", name: "Free Parking" },
    ],
  },
];

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Accommodations",
  },
];
const AccommodationsPage = () => {
  return (
    <PageContainer
      title="Accommodations List"
      description="this is Accommodations List page"
    >
      {/* breadcrumb */}
      <Breadcrumb title="Accommodations" items={BCrumb} />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left part */}
        {/* ------------------------------------------- */}
        {/* <ProductSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
        /> */}
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Box p={5} flexGrow={1}>
          <AccommodationsList
            accommodations={mockAccommodations}
            onClick={function (event: React.SyntheticEvent | Event): void {
              throw new Error("Function not implemented.");
            }}
          />
          {/* onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
          /> */}
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default AccommodationsPage;
