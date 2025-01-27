import {
  acceptReservation,
  cancelReservation,
  declineReservation,
  getPendingReservations,
} from "@api/accommodations/reservations";
import { useQuery } from "@tanstack/react-query";
import ReservationsList from "./ReservationsList";
import Spinner from "@ui/view/spinner/Spinner";
import { Autocomplete, Box, TextField } from "@mui/material";
import { SelectAccommodation } from "@api/accommodations/accommodations";
// import { reservations } from "./ReservationsPage";
import { usePendingReservationFilterStore } from "@stores/reservationsStore";
import useAuthStore from "@stores/authStore";
import queryClient, { invalidateAllQueries } from "../../query-client";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";

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

  const cancelMutation = useNotifiedMutation({
    mutationFn: isGuest ? cancelReservation : declineReservation,
    onSuccess: () => invalidateAllQueries(queryClient, "reservations"),
    showSuccessNotification: true,
  });

  const approveMutation = useNotifiedMutation({
    mutationFn: acceptReservation,
    onSuccess: () => invalidateAllQueries(queryClient, "reservations"),
    showSuccessNotification: true,
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
      <Box sx={{ width: "100%" }}>
        {isLoading ? (
          <Spinner />
        ) : data ? (
          <ReservationsList
            reservations={data}
            type={isGuest ? "PENDING" : "APPROVAL"}
            primaryMutation={approveMutation}
            secondaryMutation={isGuest ? undefined : cancelMutation}
          />
        ) : (
          <div>No reservations found</div>
        )}
      </Box>
    </Box>
  );
}
