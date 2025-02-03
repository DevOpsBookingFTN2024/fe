import { getAccommodationById } from "@api/accommodations/accommodations";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "@ui/container/PageContainer";
import AccommodationDetails from "@ui/shared/AccommodationDetails";
import Carousel from "@ui/shared/carousel/Carousel";
import ChildCard from "@ui/shared/ChildCard";
import Spinner from "@ui/view/spinner/Spinner";
import { useParams } from "react-router-dom";
import AvailabilityCalendarV2 from "./calendar/AvailabilityCalendarV2";
import AvailabilityModal from "./calendar/AvailabilityModal";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Shop",
    to: "/apps/ecommerce",
  },
  {
    title: "detail",
  },
];

export default function AccommodationAvailabilityPage() {
  const { accommodationId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["accommodation_details", accommodationId],
    queryFn: () => getAccommodationById(accommodationId ?? ""),
  });
  const imageUrls = data?.accommodationDTO.photos.length
    ? data?.accommodationDTO.photos.map(
        (photo) =>
          `${import.meta.env.VITE_ACCOMMODATIONS_API_URL}photos/${photo.url}`
      )
    : ["https://via.placeholder.com/350x250?text=No+Image+Available"];

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
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} lg={6}>
                    <Carousel images={imageUrls} />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <AccommodationDetails item={data} />
                  </Grid>
                </Grid>
              </ChildCard>
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <AvailabilityCalendarV2 />
            </Grid>
          </Grid>
          <AvailabilityModal />
        </>
      )}
    </PageContainer>
  );
}
