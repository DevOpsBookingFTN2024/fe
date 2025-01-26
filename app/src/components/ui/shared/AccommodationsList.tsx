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
import { IconEdit, IconSlash, IconTrash } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { ConfirmModal } from "@ui/modal/ConfirmModal";
import { useState } from "react";
import { Link } from "react-router-dom";
import queryClient, { invalidateAllQueries } from "../../../query-client";
import {
  AccommodationDTO,
  deleteAccommodation,
  Facility,
  updateAccommodation,
} from "@api/accommodations/accommodations";
import { useAccommodationModalStore } from "@stores/accommodationStore";
import AccommodationSearch from "@pages/accommodations/AccommodationSearch";

interface Props {
  accommodations: AccommodationDTO[];
  isEdit?: boolean;
}

const AccommodationsList = ({ accommodations, isEdit }: Props) => {
  const openAccommodationModal = useAccommodationModalStore(
    (state) => state.openModal
  );

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>();

  const deleteMutation = useMutation({
    mutationFn: deleteAccommodation,
    onSuccess: () =>
      invalidateAllQueries(queryClient, "item.accommodationDTOs"),
  });

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const theme = useTheme();

  const renderItem = (item: AccommodationDTO, index: number) => (
    <Grid
      item
      xs={12}
      lg={12}
      md={12}
      sm={12}
      display="flex"
      alignItems="stretch"
      key={item.accommodationDTO.id + index}
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
          <Typography component={Link} to={`${item.accommodationDTO.id}`}>
            <CardMedia
              component="img"
              sx={{
                width: 250,
                height: "100%",
                objectFit: "cover",
                borderRadius: 2,
              }}
              image={
                item.accommodationDTO.photos?.length > 0
                  ? `${import.meta.env.VITE_ACCOMMODATIONS_API_URL}photos/${
                      item.accommodationDTO.photos[0].url
                    }`
                  : "https://via.placeholder.com/300x200?text=Accommodation+Image"
              }
              alt={item.accommodationDTO.name}
            />
          </Typography>
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
                  {item.accommodationDTO.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  {item.accommodationDTO.address}, {item.accommodationDTO.city},{" "}
                  {item.accommodationDTO.country}
                </Typography>

                {/* Facilities */}
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", mt: 1, gap: 0.5 }}
                >
                  {item.accommodationDTO.facilities?.map(
                    (facility: Facility, index: number) => (
                      <Chip
                        key={index}
                        label={facility.name.toString()}
                        size="small"
                        color="primary"
                      />
                    )
                  )}
                </Box>
              </Box>
              {/* Rating */}
              <Box sx={{ textAlign: "right" }}>
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

            {/* Location Score */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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
                  value={item.accommodationDTO.hostScore}
                  precision={0.5}
                  readOnly
                />
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="primary"
                  sx={{ ml: 1 }}
                >
                  {item.accommodationDTO.hostScore}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography mt={2} variant="h5" fontWeight={600} display="flex">
                  {(() => {
                    const { pricingStrategy } = item.accommodationDTO;
                    const price =
                      pricingStrategy === "PER_GUEST" && item.pricePerGuest
                        ? item.pricePerGuest
                        : item.pricePerUnit
                        ? item.pricePerUnit
                        : null;

                    return price !== null ? `$${price.toFixed(2)}` : "NA";
                  })()}
                  <IconSlash />
                  <Chip
                    label={
                      item.accommodationDTO.pricingStrategy === "PER_GUEST"
                        ? "Guest"
                        : "Unit"
                    }
                    color="success"
                    size="small"
                  />
                </Typography>
                {!isEdit && (
                  <Typography
                    mt={2}
                    variant="h5"
                    fontWeight={600}
                    display={"flex"}
                  >
                    Total: {}
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Action Button */}
            <Box sx={{ mt: 3 }}>
              <Link to={`${item.accommodationDTO.id}`}>
                <Button variant="outlined" color="primary">
                  Open
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Box>
        <Divider sx={{ marginTop: 2 }} />
        {isEdit && (
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
                openAccommodationModal(
                  item.accommodationDTO,
                  updateAccommodation,
                  true
                );
              }}
            >
              <IconEdit size="18" color="#1C9CEA" />
            </IconButton>
            <IconButton
              onClick={() => {
                setDeleteId(item.accommodationDTO.id);
                setIsDeleteOpen(true);
              }}
            >
              <IconTrash size="18" color="red" />
            </IconButton>
          </Box>
        )}
      </Card>
      {/* <AccommodationModal /> */}
    </Grid>
  );

  const renderEmptyList = () => (
    <Grid item xs={12} lg={12} md={12} sm={12}>
      <Box textAlign="center" mt={6}>
        {/* <img src={emptyCart} alt="cart" width="200px" /> */}
        <Typography variant="h2">No Accommodation</Typography>
        <Typography variant="h6" mb={3}>
          No item.accommodationDTO found. Please try again.
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
          accommodations.map((accommodation, index) =>
            renderItem(accommodation, index)
          )
        ) : (
          <>{renderEmptyList()}</>
        )}
      </Grid>
      <ConfirmModal
        title={"Delete Accommodation"}
        content={"Are you sure you want to delete this item.accommodationDTO?"}
        Icon={IconTrash}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        primaryAction={() => {
          if (!deleteId) return;
          deleteMutation.mutate(deleteId);
          setDeleteId(undefined);
          setIsDeleteOpen(false);
        }}
      />
    </Box>
  );
};

export default AccommodationsList;
