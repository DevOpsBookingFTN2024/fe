import {
  cancelReservation,
  getAcceptedReservations,
} from "@api/accommodations/reservations";
import { useAcceptedReservationFilterStore } from "@stores/reservationsStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReservationsList from "./ReservationsList";
import Spinner from "@ui/view/spinner/Spinner";
import { Autocomplete, Box, TextField } from "@mui/material";
import { SelectAccommodation } from "@api/accommodations/accommodations";
import { reservations } from "./ReservationsPage";
import useAuthStore from "@stores/authStore";
import queryClient, { invalidateAllQueries } from "../../query-client";

export interface AcceptedReservationTabProps {
  selectAccommodations?: SelectAccommodation[];
}

export default function AcceptedReservationsTab({
  selectAccommodations,
}: AcceptedReservationTabProps) {
  const { filter, updateFilterAccommodationId } =
    useAcceptedReservationFilterStore();
  const { user, isGuest } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["accepted_reservations", "reservations", filter],
    queryFn: async () => {
      return getAcceptedReservations(filter, isGuest);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelReservation,
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
          <ReservationsList reservations={reservations} type="ACTIVE" mutation={cancelMutation} />
        ) : (
          <div>No reservations found</div>
        )}
        ;
      </Box>
    </Box>
  );
}
