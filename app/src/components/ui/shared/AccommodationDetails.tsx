import { Accommodation } from "@api/accommodations/accommodations";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  Fab,
  Grid,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import {
  IconCheck,
  IconMinus,
  IconPin,
  IconPlus,
  IconSlash,
  IconUser,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export interface AccommodationDetailsProps {
  accommodation: Accommodation;
}

export default function AccommodationDetails({
  accommodation,
}: AccommodationDetailsProps) {
  const theme = useTheme();
  return (
    <Box p={2}>
      {accommodation ? (
        <>
          {/* ------------------------------------------- */}
          {/* Title and description */}
          {/* ------------------------------------------- */}
          <Typography
            variant="body1"
            color={theme.palette.text.secondary}
            display={"flex"}
            gap={1}
          >
            <IconUser size={17} /> {accommodation.host}
          </Typography>
          <Typography fontWeight="600" variant="h4" mt={1}>
            {accommodation.name}
          </Typography>
          <Typography
            variant="subtitle2"
            mt={1}
            color={theme.palette.text.secondary}
            display={"flex"}
            gap={1}
          >
            <IconPin size={17} />
            {accommodation.address}, {accommodation.city},{" "}
            {accommodation.country}
          </Typography>
          {/* ------------------------------------------- */}
          {/* Price */}
          {/* ------------------------------------------- */}
          <Typography mt={2} variant="h4" fontWeight={600} display={"flex"}>
            ${100} <IconSlash />
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
          <Stack direction={"row"} alignItems="center" gap="10px" mt={2} pb={3}>
            <Rating
              name="simple-controlled"
              size="small"
              value={4.5}
              readOnly
            />
            <Link to="/" color="inherit">
              (236 reviews)
            </Link>
          </Stack>
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
