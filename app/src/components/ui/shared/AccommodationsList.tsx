import { Accommodation } from "@api/accommodations/accommodations";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  IconButton,
  Rating,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAccommodationFilterStore } from "@stores/accommodationStore";
import AccommodationSearch from "../../../pages/accommodations/AccommodationSearch";
import { IconEdit, IconTrash } from "@tabler/icons-react";

interface Props {
  onClick: (event: React.SyntheticEvent | Event) => void;
  accommodations: Accommodation[];
  isEdit?: boolean;
}

const AccommodationsList = ({ onClick, accommodations, isEdit }: Props) => {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const theme = useTheme();
  const { filter } = useAccommodationFilterStore();
  console.log(filter);
  //   const { data, isError, isFetching, isLoading, refetch } = useQuery({
  //     queryKey: [
  //       "accommodations",
  //       user?.id,
  //       startDate,
  //       endDate,
  //       columnFilters,
  //     ],
  //     queryFn: async () => {
  //       const pageRequest = {
  //         page: pagination.pageIndex,
  //         size: pagination.pageSize,
  //       } as PageRequest;

  //       return getAnalyticsPerDate(state?.userId, columnFilters, pageRequest);
  //     },
  //   });

  const renderItem = (accommodation: Accommodation, theme: Theme) => (
    <Grid
      item
      xs={12}
      lg={12}
      md={12}
      sm={12}
      display="flex"
      alignItems="stretch"
      key={accommodation.id}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          boxShadow: 3,
          borderRadius: 2,
          paddingBottom: "0px",
        }}
      >
        {/* Image Section */}
        <Box sx={{ display: "flex", flex: 1 }}>
          <CardMedia
            component="img"
            sx={{
              width: 250,
              height: "100%",
              objectFit: "cover",
              borderRadius: 2,
            }}
            image={
              "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            }
            alt={accommodation.name}
          />
          {/* Content Section */}
          <CardContent
            sx={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              {/* Name */}
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {accommodation.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  {accommodation.address}, {accommodation.city}
                </Typography>

                {/* Facilities */}
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", mt: 1, gap: 0.5 }}
                >
                  {accommodation.facilities.map((facility, index) => (
                    <Chip
                      key={index}
                      label={facility.name.toString()}
                      size="small"
                      color="primary"
                    />
                  ))}
                </Box>
              </Box>
              {/* Rating */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="primary"
                >
                  Score
                </Typography>
                <Typography variant="h5" color="primary">
                  {4.2}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {5} reviews
                </Typography>
              </Box>
            </Box>

            {/* Address and Distance */}

            {/* Location Score */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Typography
                variant="body2"
                fontWeight="bold"
                color="textSecondary"
                sx={{ mr: 1 }}
              >
                Host Score:
              </Typography>
              <Rating
                value={accommodation.hostScore}
                precision={0.5}
                readOnly
              />
              <Typography
                variant="body2"
                fontWeight="bold"
                color="primary"
                sx={{ ml: 1 }}
              >
                {accommodation.hostScore}
              </Typography>
            </Box>

            {/* Action Button */}
            <Box sx={{ mt: 3 }}>
              <Button variant="outlined" color="primary">
                Open
              </Button>
            </Box>
          </CardContent>
        </Box>
        <Divider sx={{ marginTop: 2 }} />
        <Box
          p={2}
          py={1}
          textAlign={"center"}
          // sx={{
          //   backgroundColor:
          //     theme.palette.mode === "dark"
          //       ? "rgba(0, 0, 0, 0.05)"
          //       : "grey.100",
          // }}
        >
          <IconButton
            onClick={() => {
              // openProductModal(product, updateProduct, true);
            }}
          >
            <IconEdit size="18" color="#1C9CEA" />
          </IconButton>
          <IconButton
            onClick={() => {
              // setDeleteId(product.id);
              // setIsDeleteOpen(true);
            }}
          >
            <IconTrash size="18" color="red" />
          </IconButton>
        </Box>
      </Card>
    </Grid>
  );

  const renderEmptyList = () => (
    <Grid item xs={12} lg={12} md={12} sm={12}>
      <Box textAlign="center" mt={6}>
        {/* <img src={emptyCart} alt="cart" width="200px" /> */}
        <Typography variant="h2">No offers</Typography>
        <Typography variant="h6" mb={3}>
          The offer is not available
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <Box>
      {/* ------------------------------------------- */}
      {/* Header Detail page */}
      {/* ------------------------------------------- */}

      {!isEdit && (
        <Box sx={{ marginBottom: 2 }}>
          <AccommodationSearch />
        </Box>
      )}
      {/* ------------------------------------------- */}
      {/* Page Listing product */}
      {/* ------------------------------------------- */}
      <Grid container spacing={3}>
        {accommodations?.length > 0 ? (
          accommodations.map((accommodation) =>
            renderItem(accommodation, theme)
          )
        ) : (
          <>{renderEmptyList()}</>
        )}
      </Grid>
    </Box>
  );
};

export default AccommodationsList;
