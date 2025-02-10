import { getAccommodationById } from "@api/accommodations/accommodations";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import { Button, Grid } from "@mui/material";
import { useAccommodationFilterStore } from "@stores/accommodationStore";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "@ui/container/PageContainer";
import AccommodationDetails from "@ui/shared/AccommodationDetails";
import Carousel from "@ui/shared/carousel/Carousel";
import ChildCard from "@ui/shared/ChildCard";
import Spinner from "@ui/view/spinner/Spinner";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ConfirmReservationModal from "./ConfirmReservationModal";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Accommodations",
    to: "/",
  },
  {
    title: "Detail",
  },
];

export default function AccommodationDetailsPage() {
  const { accommodationId } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["accommodation_details", accommodationId],
    queryFn: () => getAccommodationById(accommodationId ?? ""),
  });
  const { filter } = useAccommodationFilterStore();
  const [isCreateReservationOpen, setIsCreateReservationOpen] = useState(false);

  return (
    <PageContainer
      title="Accommodation availability"
      description="this is AccommodationAvailability page"
    >
      <Breadcrumb title="Accommodations details" items={BCrumb} />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Grid
            container
            spacing={3}
            sx={{ maxWidth: { lg: "1055px", xl: "1200px" } }}
          >
            <Grid item xs={12} sm={12} lg={12}>
              <ChildCard>
                {/* ------------------------------------------- */}
                {/* Carousel */}
                {/* ------------------------------------------- */}
                <Button
                  sx={{ marginBottom: 3, marginRight: "auto" }}
                  onClick={() => setIsCreateReservationOpen(true)}
                >
                  Create reservation
                </Button>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} lg={6}>
                    <Carousel
                      images={
                        data?.accommodationDTO.photos?.length
                          ? data?.accommodationDTO.photos.map(
                              (photo) =>
                                `${
                                  import.meta.env.VITE_ACCOMMODATIONS_API_URL
                                }photos/${photo.url}`
                            )
                          : [
                              "https://via.placeholder.com/300x200?text=Accommodation+Image",
                            ]
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <AccommodationDetails item={data} />
                  </Grid>
                </Grid>
              </ChildCard>
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              {/* <ProductRelated /> */}
            </Grid>
          </Grid>
          <ConfirmReservationModal
            item={{
              dateFrom: filter.startDate ?? new Date(),
              dateTo: filter.endDate ?? new Date(),
              numberOfGuests: filter.guestCount ?? 1,
              accommodationId: data?.accommodationDTO.id,
            }}
            isOpen={isCreateReservationOpen}
            setIsOpen={setIsCreateReservationOpen}
          />
        </>
      )}
    </PageContainer>
  );
}
