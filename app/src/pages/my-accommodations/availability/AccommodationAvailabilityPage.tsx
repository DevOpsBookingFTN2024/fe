import { Accommodation } from "@api/accommodations/accommodations";
import Breadcrumb from "@layout/full/shared/breadcrumb/Breadcrumb";
import { Grid } from "@mui/material";
import PageContainer from "@ui/container/PageContainer";
import ChildCard from "@ui/shared/ChildCard";
import { useParams } from "react-router-dom";
import AvailabilityModal from "./calendar/AvailabilityModal";
import AvailabilityCalendarV2 from "./calendar/AvailabilityCalendarV2";
import Carousel from "@ui/shared/carousel/Carousel";
import AccommodationDetails from "@ui/shared/AccommodationDetails";

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

const accommodation: Accommodation = {
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
  host: "John Doe",
  facilities: [
    { id: "9", name: "Wi-Fi" },
    { id: "10", name: "Pet Friendly" },
    { id: "11", name: "BBQ Area" },
  ],
};

export default function AccommodationAvailabilityPage() {
  const { accommodationId } = useParams();

  //   const { data: accommodationDetails, isLoading } = useQuery({
  //     queryKey: ["accommodation_details", accommodationId],
  //     queryFn: () => getAccommodationById(accommodationId ?? ""),
  //   });

  return (
    <PageContainer
      title="Accommodation availability"
      description="this is AccommodationAvailability page"
    >
      <Breadcrumb title="Accommodations details" items={BCrumb} />
      {/* {isLoading ? (
        <Spinner />
      ) : ( */}
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
                <Carousel
                  images={[
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
                  ]}
                />
              </Grid>
              <Grid item xs={12} sm={12} lg={6}>
                <AccommodationDetails accommodation={accommodation} />
              </Grid>
            </Grid>
          </ChildCard>
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          <AvailabilityCalendarV2 />
          {/* <ProductDesc /> */}
        </Grid>
        <Grid item xs={12} sm={12} lg={12}>
          {/* <ProductRelated /> */}
        </Grid>
      </Grid>
      <AvailabilityModal />
      {/* )} */}
    </PageContainer>
  );
}
