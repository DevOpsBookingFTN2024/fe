import { AccommodationDTO } from "@api/accommodations/accommodations";
import {
  Box,
  Button,
  Chip,
  Divider,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import GuestsRatingsModal from "@pages/rating/GuestsRatingsModal";
import RatingModal from "@pages/rating/RatingModal";
import useAuthStore from "@stores/authStore";
import {
  IconCarambola,
  IconHomeStar,
  IconPin,
  IconSlash,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";

export interface AccommodationDetailsProps {
  item?: AccommodationDTO;
}

export default function AccommodationDetails({
  item,
}: AccommodationDetailsProps) {
  const theme = useTheme();
  const { user, isGuest } = useAuthStore();

  const [modalsState, setModalsState] = useState({
    isRatingModalOpen: false,
    isGuestRatingsModalOpen: false,
    ratingId: "",
    ratingType: "HOST" as "HOST" | "ACCOMMODATION",
  });

  const handleRate = (type: "HOST" | "ACCOMMODATION", id: string) => {
    setModalsState({
      ...modalsState,
      isRatingModalOpen: true,
      ratingId: id,
      ratingType: type,
    });
  };

  const handleSeeRatings = (type: "HOST" | "ACCOMMODATION", id: string) => {
    setModalsState({
      ...modalsState,
      isGuestRatingsModalOpen: true,
      ratingId: id,
      ratingType: type,
    });
  };

  const closeModal = (modal: keyof typeof modalsState) => {
    setModalsState((prev) => ({ ...prev, [modal]: false, selectedId: "" }));
  };

  return (
    <>
      <Box p={2}>
        {item ? (
          <>
            {/* ------------------------------------------- */}
            {/* Title and description */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Box>
                <Typography fontWeight="600" variant="h4" mt={1}>
                  {item.accommodationDTO.name}
                </Typography>

                <Typography
                  variant="body1"
                  color={theme.palette.text.secondary}
                  display={"flex"}
                  gap={1}
                  mt={1}
                >
                  <IconUser size={17} /> {item.accommodationDTO.host}
                </Typography>

                <Typography
                  variant="subtitle2"
                  color={theme.palette.text.secondary}
                  display={"flex"}
                  gap={1}
                >
                  <IconPin size={17} />
                  {item.accommodationDTO.address}, {item.accommodationDTO.city},{" "}
                  {item.accommodationDTO.country}
                </Typography>
              </Box>
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
                <Typography
                  onClick={() =>
                    handleSeeRatings("ACCOMMODATION", item.accommodationDTO.id ?? "")
                  }
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "primary.main",
                    "&:hover": {
                      color: "primary.dark",
                    },
                  }}
                >
                  See ratings
                </Typography>
              </Box>
            </Box>
            {/* ------------------------------------------- */}
            {/* Price */}
            {/* ------------------------------------------- */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <Stack>
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
                    value={item.averageHostScore}
                    precision={0.5}
                    readOnly
                  />
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="primary"
                    sx={{ ml: 1 }}
                  >
                    {item.averageHostScore}
                  </Typography>
                </Box>
                <Typography
                  onClick={() =>
                    handleSeeRatings("HOST", item.accommodationDTO.host ?? "")
                  }
                  sx={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "primary.main",
                    "&:hover": {
                      color: "primary.dark",
                    },
                  }}
                >
                  See ratings
                </Typography>
              </Stack>

              <Typography variant="h4" fontWeight={600} display={"flex"}>
                Price <IconSlash />
                <Chip
                  label={
                    item.accommodationDTO.pricingStrategy == "PER_GUEST"
                      ? "Guest"
                      : "Unit"
                  }
                  color="success"
                  size="small"
                />
              </Typography>
            </Box>
            {/* ------------------------------------------- */}
            {/* Ratings */}
            {/* ------------------------------------------- */}
            {/* <Stack direction={"row"} alignItems="center" gap="10px" mt={2} pb={3}>
              <Rating
                name="simple-controlled"
                size="small"
                value={4.5}
                readOnly
              />
              <Link to="/" color="inherit">
                (236 reviews)
              </Link>
            </Stack> */}
            <Divider />
            {/* ------------------------------------------- */}
            {/* Colors */}
            {/* ------------------------------------------- */}
            <Stack py={4} direction="row" alignItems="center">
              <Typography variant="h6" mr={1}>
                Facilities:
              </Typography>
              <Box display={"flex"} flexWrap={"wrap"} gap={1}>
                {item.accommodationDTO.facilities.map((facility) => (
                  <Chip key={facility.id} label={facility.name} />
                ))}
              </Box>
            </Stack>
            <Divider />

            {isGuest && (
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                <Button
                  onClick={() =>
                    handleRate("HOST", item.accommodationDTO.host ?? "")
                  }
                  sx={{ marginTop: 1 }}
                  variant="text"
                  color="warning"
                  startIcon={<IconCarambola />}
                >
                  Rate host
                </Button>
                <Button
                  onClick={() =>
                    handleRate("ACCOMMODATION", item.accommodationDTO.id)
                  }
                  sx={{ marginTop: 1 }}
                  variant="text"
                  color="warning"
                  startIcon={<IconHomeStar />}
                >
                  Rate accommodation
                </Button>
              </Box>
            )}

            {user?.roles.includes("ROLE_ADMIN") && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                {/* Min Number of Guests */}
                <Box sx={{ textAlign: "center", flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Minimum guests:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "secondary.main" }}
                  >
                    {item.accommodationDTO.minimumGuests}
                  </Typography>
                </Box>

                {/* Max Number of Guests */}
                <Box sx={{ textAlign: "center", flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Maximum guests:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "secondary.main" }}
                  >
                    {item.accommodationDTO.maximumGuests}
                  </Typography>
                </Box>

                {/* Approval Strategy */}
                <Box sx={{ textAlign: "center", flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Approval strategy:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "secondary.main" }}
                  >
                    MANUAL
                  </Typography>
                </Box>
              </Box>
            )}
          </>
        ) : (
          "No product"
        )}
      </Box>
      <RatingModal
        ratingId={modalsState.ratingId}
        isOpen={modalsState.isRatingModalOpen}
        setIsOpen={() => closeModal("isRatingModalOpen")}
        ratingType={modalsState.ratingType}
      />
      <GuestsRatingsModal
        ratingId={modalsState.ratingId}
        isOpen={modalsState.isGuestRatingsModalOpen}
        setIsOpen={() => closeModal("isGuestRatingsModalOpen")}
        ratingType={modalsState.ratingType}
      />
    </>
  );
}
