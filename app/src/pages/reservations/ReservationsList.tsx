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
  Typography
} from "@mui/material";
import useAuthStore from "@stores/authStore";
import { IconSlash } from "@tabler/icons-react";
import { ConfirmModal } from "@ui/modal/ConfirmModal";
import { useState } from "react";

interface Props {
  reservations?: Reservation[];
  type?: "ACTIVE" | "PENDING" | "HISTORY" | "APPROVAL";
  primaryMutation?: (id: string) => void;
  secondaryMutation?: (id: string) => void;
}

const ReservationsList = ({
  reservations = [],
  type,
  primaryMutation,
  secondaryMutation,
}: Props) => {
  const { isGuest } = useAuthStore();

  const [modalsState, setModalsState] = useState({
    isPrimaryModalOpen: false,
    isSecondaryModalOpen: false,
    selectedId: "",
  });

  const openModal = (modal: keyof typeof modalsState, id = "") => {
    setModalsState((prev) => ({ ...prev, [modal]: true, selectedId: id }));
  };

  const closeModal = (modal: keyof typeof modalsState) => {
    setModalsState((prev) => ({ ...prev, [modal]: false, selectedId: "" }));
  };


  const renderActions = (reservation: Reservation) => {
    if (type === "ACTIVE" || type === "PENDING") {
      return isGuest ? (
        <>
          <Divider />
          <Button
            onClick={() => openModal("isPrimaryModalOpen", reservation.id)}
            sx={{ marginTop: 1 }}
            variant="text"
            color="error"
          >
            Cancel
          </Button>
        </>
      ) : null;
    }

    if (type === "APPROVAL") {
      return (
        <>
          <Divider />
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
            <Button
              onClick={() => openModal("isPrimaryModalOpen", reservation.id)}
              sx={{ marginTop: 1 }}
              variant="text"
              color="success"
            >
              Accept
            </Button>
            <Button
              onClick={() => openModal("isSecondaryModalOpen", reservation.id)}
              sx={{ marginTop: 1 }}
              variant="text"
              color="error"
            >
              Decline
            </Button>
          </Box>
        </>
      );
    }

    return null;
  };

  const renderReservationCard = (reservation: Reservation) => (
    <Grid item xs={12} display="flex" alignItems="stretch" key={reservation.id}>
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
                reservation.reservationStatus === "PASSED" ? "#32a852" : "red",
              textAlign: "center",
              py: 0,
            }}
          />
        )}
        <CardContent sx={{ display: "flex", flexDirection: "column", py: 0 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                      reservation.accommodation.pricingStrategy == "PER_GUEST"
                        ? "Guest"
                        : "Unit"
                    }
                    color="success"
                    size="small"
                  />
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="body1" display="flex" alignItems="center">
                <CalendarMonthIcon sx={{ mr: 1 }} />
                {new Date(reservation.dateFrom).toLocaleDateString()} -{" "}
                {new Date(reservation.dateTo).toLocaleDateString()}
              </Typography>
              <Typography variant="h6" display="flex" alignItems="center">
                <PeopleOutlineIcon sx={{ mr: 1 }} />
                {reservation.numberOfGuests}
              </Typography>
              <Typography mt={1} variant="h5" fontWeight={600}>
                Total: ${reservation.totalPrice.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Box textAlign={"center"}>{renderActions(reservation)}</Box>
        </CardContent>
      </Card>
    </Grid>
  );

  const renderEmptyState = () => (
    <Grid item xs={12}>
      <Box textAlign="center" mt={6}>
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
        {reservations.length > 0
          ? reservations.map(renderReservationCard)
          : renderEmptyState()}
      </Grid>
      {primaryMutation && (
        <ConfirmModal
          title="Confirm action"
          content="Are you sure you want to perform this action?"
          isOpen={modalsState.isPrimaryModalOpen}
          setIsOpen={() => closeModal("isPrimaryModalOpen")}
          primaryAction={() => {
            if (modalsState.selectedId) {
              primaryMutation(modalsState.selectedId);
              closeModal("isPrimaryModalOpen");
            }
          }}
        />
      )}
      {secondaryMutation && (
        <ConfirmModal
          title="Confirm action"
          content="Are you sure you want to perform this action?"
          isOpen={modalsState.isSecondaryModalOpen}
          setIsOpen={() => closeModal("isSecondaryModalOpen")}
          primaryAction={() => {
            if (modalsState.selectedId) {
              secondaryMutation(modalsState.selectedId);
              closeModal("isSecondaryModalOpen");
            }
          }}
        />
      )}
    </Box>
  );
};

export default ReservationsList;
