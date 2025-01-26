import { Accommodation } from "@api/accommodations/accommodations";
import {
  Box,
  Chip,
  Divider,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useAuthStore from "@stores/authStore";
import { IconPin, IconSlash, IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export interface AccommodationDetailsProps {
  accommodation?: Accommodation;
}

export default function AccommodationDetails({
  accommodation,
}: AccommodationDetailsProps) {
  const theme = useTheme();
  const { user } = useAuthStore();

  console.log(user)
  return (
    <Box p={2}>
      {accommodation ? (
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
                {accommodation.name}
              </Typography>

              <Typography
                variant="body1"
                color={theme.palette.text.secondary}
                display={"flex"}
                gap={1}
                mt={1}
              >
                <IconUser size={17} /> {accommodation.host}
              </Typography>

              <Typography
                variant="subtitle2"
                color={theme.palette.text.secondary}
                display={"flex"}
                gap={1}
              >
                <IconPin size={17} />
                {accommodation.address}, {accommodation.city},{" "}
                {accommodation.country}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="subtitle1" fontWeight="bold" color="primary">
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
          {/* ------------------------------------------- */}
          {/* Price */}
          {/* ------------------------------------------- */}
          <Typography m={2} variant="h4" fontWeight={600} display={"flex"}>
            Price <IconSlash />
            <Chip
              label={
                accommodation.pricingStrategy == "PER_GUEST" ? "Guest" : "Unit"
              }
              color="success"
              size="small"
            />
          </Typography>
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
              {accommodation.facilities.map((facility) => (
                <Chip key={facility.id} label={facility.name} />
              ))}
            </Box>
          </Stack>
          <Divider />

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
                  {accommodation.minimumGuests}
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
                  12
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
          {/* ------------------------------------------- */}
          {/* Qty */}
          {/* ------------------------------------------- */}
          {/* <Divider /> */}
          {/* ------------------------------------------- */}
          {/* Buttons */}
          {/* ------------------------------------------- */}
          {/* <Grid container spacing={2} mt={3}>
            <Grid item xs={12} lg={4} md={6}>
              <Button
                color="primary"
                size="large"
                fullWidth
                component={Link}
                variant="contained"
                to="/apps/eco-checkout"
              >
                Buy Now
              </Button>
            </Grid>
            <Grid item xs={12} lg={4} md={6}>
              <Button color="error" size="large" fullWidth variant="contained">
                Add to Cart
              </Button>
            </Grid>
          </Grid> */}
        </>
      ) : (
        "No product"
      )}
    </Box>
  );
}
