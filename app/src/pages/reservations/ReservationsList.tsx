import { Reservation } from "@api/accommodations/reservations";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useAuthStore from "@stores/authStore";
import { IconCarambola, IconHomeStar, IconSlash } from "@tabler/icons-react";
import { ConfirmModal } from "@ui/modal/ConfirmModal";
import { useState } from "react";

interface Props {
  onClick?: (event: React.SyntheticEvent | Event) => void;
  reservations?: Reservation[];
  type?: "ACTIVE" | "PENDING" | "HISTORY" | "APPROVAL";
  primaryMutation?: any;
  secondaryMutation?: any;
}

const ReservationsList = ({
  onClick,
  reservations,
  type,
  primaryMutation,
  secondaryMutation,
}: Props) => {
  const { isGuest } = useAuthStore();

  const [isPrimaryModalOpen, setIsPrimaryModalOpen] = useState(false);
  const [isSecondaryModalOpen, setIsSecondaryModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>();

  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));
  const theme = useTheme();

  const renderActions = (type: Props["type"], reservation: Reservation) => {
    switch (type) {
      case "ACTIVE":
        if (isGuest) {
          return (
            <>
              <Divider />
              <Button
                onClick={() => {
                  setSelectedId(reservation.id);
                  setIsPrimaryModalOpen(true);
                }}
                sx={{ marginTop: 1 }}
                variant="text"
                color="error"
              >
                Cancel
              </Button>
            </>
          );
        } else return null;
      case "PENDING":
        if (isGuest) {
          return (
            <Button
              onClick={() => {
                setSelectedId(reservation.id);
                setIsPrimaryModalOpen(true);
              }}
              sx={{ marginTop: 1 }}
              variant="text"
              color="error"
            >
              Cancel
            </Button>
          );
        } else {
          return null;
        }

      case "APPROVAL":
        return (
          <>
            <Divider />
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Button
                onClick={() => {
                  setSelectedId(reservation.id);
                  setIsPrimaryModalOpen(true);
                }}
                sx={{ marginTop: 1 }}
                variant="text"
                color="success"
              >
                Accept
              </Button>
              <Button
                onClick={() => {
                  setSelectedId(reservation.id);
                  setIsSecondaryModalOpen(true);
                }}
                sx={{ marginTop: 1 }}
                variant="text"
                color="error"
              >
                Decline
              </Button>
            </Box>
          </>
        );
      case "HISTORY":
        if (reservation.reservationStatus === "PASSED" && isGuest) {
          return (
            <>
              <Divider />
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                <Button
                  onClick={() => {
                    // Handle accept action
                    console.log("Accepted:", reservation.id);
                  }}
                  sx={{ marginTop: 1 }}
                  variant="text"
                  color="warning"
                  startIcon={<IconCarambola />}
                >
                  Rate host
                </Button>
                <Button
                  onClick={() => {
                    // Handle decline action
                    console.log("Declined:", reservation.id);
                  }}
                  sx={{ marginTop: 1 }}
                  variant="text"
                  color="warning"
                  startIcon={<IconHomeStar />}
                >
                  Rate accommodation
                </Button>
              </Box>
            </>
          );
        }
        return null;
      default:
        return null; // Default case
    }
  };

  const renderItem = (reservation: Reservation, theme: Theme) => {
    return (
      <Grid
        item
        xs={12}
        lg={12}
        md={12}
        sm={12}
        display="flex"
        alignItems="stretch"
        key={reservation.id}
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
          {type === "HISTORY" && (
            <CardHeader
              title={reservation.reservationStatus}
              sx={{
                color:
                  reservation.reservationStatus === "PASSED"
                    ? "#32a852"
                    : "red",
                textAlign: "center",
                py: 0,
              }}
            />
          )}

          <Box sx={{ display: "flex", flex: 1, py: 0 }}>
            {/* Content Section */}
            <CardContent
              sx={{ flex: 1, display: "flex", flexDirection: "column", py: 0 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {reservation.accommodation.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" mt={1}>
                    {reservation.accommodation.address},{" "}
                    {reservation.accommodation.city}
                  </Typography>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      mt={1}
                      variant="h6"
                      fontWeight={600}
                      display={"flex"}
                    >
                      $X.X <IconSlash />
                      <Chip
                        label={
                          reservation.accommodation.pricingStrategy ==
                          "PER_GUEST"
                            ? "Guest"
                            : "Unit"
                        }
                        color="success"
                        size="small"
                      />
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" flexDirection={"column"} alignItems={"end"}>
                  <Box display="flex" alignItems="center">
                    <CalendarMonthIcon sx={{ marginRight: 1 }} />
                    <Typography variant="body1">
                      {new Date(reservation.dateFrom).toLocaleDateString()} -{" "}
                      {new Date(reservation.dateTo).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <PeopleOutlineIcon sx={{ marginRight: 1 }} />
                    <Typography variant="h6">
                      {reservation.numberOfGuests}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      mt={1}
                      variant="h5"
                      fontWeight={600}
                      display={"flex"}
                    >
                      Total: {reservation.totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Box>
          {/* Actions Section */}
          <Box p={2} py={1} textAlign={"center"}>
            {renderActions(type, reservation)}
          </Box>
        </Card>
      </Grid>
    );
  };

  const renderEmptyList = () => (
    <Grid item xs={12} lg={12} md={12} sm={12}>
      <Box textAlign="center" mt={6}>
        {/* <img src={emptyCart} alt="cart" width="200px" /> */}
        <Typography variant="h2">No reservations</Typography>
        <Typography variant="h6" mb={3}>
          No reservations found.
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <Box>
      <Grid container spacing={3}>
        {reservations?.length && reservations.length > 0 ? (
          reservations.map((reservation) => renderItem(reservation, theme))
        ) : (
          <>{renderEmptyList()}</>
        )}
      </Grid>
      {primaryMutation && (
        <ConfirmModal
          title={"Confirm action"}
          content={"Are you sure you want to perform this action?"}
          // Icon={Icon}
          isOpen={isPrimaryModalOpen}
          setIsOpen={setIsPrimaryModalOpen}
          primaryAction={() => {
            if (!selectedId) return;
            primaryMutation?.mutate(selectedId);
            setSelectedId(undefined);
            setIsPrimaryModalOpen(false);
          }}
        />
      )}
      {secondaryMutation && (
        <ConfirmModal
          title={"Confirm action"}
          content={"Are you sure you want to perform this action?"}
          // Icon={Icon}
          isOpen={isSecondaryModalOpen}
          setIsOpen={setIsSecondaryModalOpen}
          primaryAction={() => {
            if (!selectedId) return;
            secondaryMutation?.mutate(selectedId);
            setSelectedId(undefined);
            setIsSecondaryModalOpen(false);
          }}
        />
      )}
    </Box>
  );
};

export default ReservationsList;
