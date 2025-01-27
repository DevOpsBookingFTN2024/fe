import {
  Accommodation,
  createAccommodation,
  getAccommodationsByHost,
} from "@api/accommodations/accommodations";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import { Box, Fab } from "@mui/material";
import { useAccommodationModalStore } from "@stores/accommodationStore";
import useAuthStore from "@stores/authStore";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "@ui/container/PageContainer";
import AppCard from "@ui/shared/AppCard";
import Spinner from "@ui/view/spinner/Spinner";
import AccommodationsList from "../../components/ui/shared/AccommodationsList";
import AccommodationModal from "./AccommodationModal";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "My accommodations",
  },
];
const MyAccommodationsPage = () => {
  const { user } = useAuthStore();
  const openAccommodationModal = useAccommodationModalStore(
    (state) => state.openModal
  );

  const handleAddAccommodation = () =>
    openAccommodationModal({} as Accommodation, createAccommodation, true);

  const {
    data: accommodations,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["my_accommodations", user?.username],
    queryFn: async () => {
      return getAccommodationsByHost(user?.username as string);
    },
  });

  return (
    <PageContainer
      title="Accommodations List"
      description="this is Accommodations List page"
    >
      {/* breadcrumb */}
      <Breadcrumb title="My accommodations" items={BCrumb} />
      <AppCard>
        <Box p={5} flexGrow={1}>
          {isLoading || isFetching ? (
            <Spinner />
          ) : (
            <AccommodationsList
              isEdit={true}
              accommodations={accommodations ?? []}
            />
          )}
        </Box>
      </AppCard>
      <Fab
        aria-label=""
        color="primary"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={handleAddAccommodation}
      >
        <IconPlus />
      </Fab>
      <AccommodationModal />
    </PageContainer>
  );
};

export default MyAccommodationsPage;
