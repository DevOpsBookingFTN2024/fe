import {
  cancelReservation,
  declineReservation,
  getPendingReservations,
} from "@api/accommodations/reservations";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReservationsList from "./ReservationsList";
import Spinner from "@ui/view/spinner/Spinner";
import { Autocomplete, Box, TextField } from "@mui/material";
import { SelectAccommodation } from "@api/accommodations/accommodations";
import { reservations } from "./ReservationsPage";
import { usePendingReservationFilterStore } from "@stores/reservationsStore";
import useAuthStore from "@stores/authStore";
import queryClient, { invalidateAllQueries } from "../../query-client";

export interface PendingReservationTabProps {
  selectAccommodations?: SelectAccommodation[];
}

export default function PendingReservationsTab({
  selectAccommodations,
}: PendingReservationTabProps) {
  const { filter, updateFilterAccommodationId } =
    usePendingReservationFilterStore();
  const { isGuest } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["pending_reservations", "reservations", filter],
    queryFn: async () => {
      return getPendingReservations(filter, isGuest);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: isGuest ? cancelReservation : declineReservation,
    onSuccess: () => invalidateAllQueries(queryClient, "reservations"),
  });

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Autocomplete
        sx={{ minWidth: "20%", flexGrow: 1 }}
        onChange={(_event, item) => {
          updateFilterAccommodationId(item?.id);
        }}
        value={
          selectAccommodations?.find((a) => a.id === filter.idAccommodation) ||
          null
        }
        options={selectAccommodations || []}
        getOptionLabel={(option) => option.name || ""}
        renderInput={(params) => (
          <TextField {...params} label={"Accommodation"} variant="outlined" />
        )}
      />
      <Box>
        {isLoading ? (
          <Spinner />
        ) : data ? (
          <ReservationsList
            reservations={reservations}
            type="PENDING"
            mutation={cancelMutation}
          />
        ) : (
          <div>No reservations found</div>
        )}
        ;
      </Box>
    </Box>
  );
}
