import { SelectAccommodation } from "@api/accommodations/accommodations";
import {
  cancelReservation,
  getAcceptedReservations,
} from "@api/accommodations/reservations";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useAcceptedReservationFilterStore } from "@stores/reservationsStore";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@ui/view/spinner/Spinner";
import ReservationsList from "./ReservationsList";
import useAuthStore from "@stores/authStore";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import queryClient, { invalidateAllQueries } from "../../query-client";

export interface AcceptedReservationTabProps {
  selectAccommodations?: SelectAccommodation[];
}

export default function AcceptedReservationsTab({
  selectAccommodations,
}: AcceptedReservationTabProps) {
  const { filter, updateFilterAccommodationId } =
    useAcceptedReservationFilterStore();

  const { isGuest } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["accepted_reservations", "reservations", filter],
    queryFn: async () => {
      return getAcceptedReservations(filter, isGuest);
    },
  });

  const cancelMutation = useNotifiedMutation({
    mutationFn: cancelReservation,
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
            type="ACTIVE"
            primaryMutation={cancelMutation}
          />
        ) : (
          <div>No reservations found</div>
        )}
      </Box>
    </Box>
  );
}
