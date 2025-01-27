import React from "react";
import { Box } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import AppCard from "@ui/shared/AppCard";
import AccommodationsList from "../../components/ui/shared/AccommodationsList";
import {
  Accommodation,
  searchAccommodations,
} from "@api/accommodations/accommodations";
import { useAccommodationFilterStore } from "@stores/accommodationStore";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@ui/view/spinner/Spinner";

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
  const { filter } = useAccommodationFilterStore();

  console.log("filter", filter);

  const {
    data: accommodations,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["accommodations", filter],
    queryFn: async () => {
      return searchAccommodations(filter);
    },
    enabled: !!filter.startDate && !!filter.endDate && !!filter.guestCount,
  });

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
          {isLoading || isFetching ? (
            <Spinner />
          ) : (
            <AccommodationsList
              accommodations={accommodations != undefined ? accommodations : []}
            />
          )}
          {/* onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
          /> */}
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default AccommodationsPage;
