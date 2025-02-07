import { searchAccommodations } from "@api/accommodations/accommodations";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import { Box } from "@mui/material";
import { useAccommodationFilterStore } from "@stores/accommodationStore";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "@ui/container/PageContainer";
import AppCard from "@ui/shared/AppCard";
import Spinner from "@ui/view/spinner/Spinner";
import AccommodationsList from "../../components/ui/shared/AccommodationsList";
import { useEffect } from "react";
import { useStomp } from "../../StompContext";

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
        <Box p={5} flexGrow={1}>
          {isLoading || isFetching ? (
            <Spinner />
          ) : (
            <AccommodationsList
              accommodations={accommodations != undefined ? accommodations : []}
            />
          )}
        </Box>
      </AppCard>
    </PageContainer>
  );
};

export default AccommodationsPage;
