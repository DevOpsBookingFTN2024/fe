import { SelectAccommodation } from "@api/accommodations/accommodations";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@ui/view/spinner/Spinner";
import ReservationsList from "./ReservationsList";
import { getPassedReservations } from "@api/accommodations/reservations";
import useAuthStore from "@stores/authStore";
import { usePassedReservationFilterStore } from "@stores/reservationsStore";
export interface HistoryReservationTabProps {
  selectAccommodations?: SelectAccommodation[];
}

export default function HistoryReservationsTab({
  selectAccommodations,
}: HistoryReservationTabProps) {
  const { filter, updateFilterAccommodationId } =
    usePassedReservationFilterStore();
  const { isGuest } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["history_reservations", "reservations", filter],
    queryFn: async () => {
      return getPassedReservations(filter, isGuest);
    },
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
          <ReservationsList reservations={data} type="HISTORY" />
        ) : (
          <div>No reservations found</div>
        )}
      </Box>
    </Box>
  );
}
