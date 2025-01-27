import {
  createReservation,
  InputReservation,
} from "@api/accommodations/reservations";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  Stack,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import queryClient, { invalidateAllQueries } from "../../../query-client";

export interface ConfirmModalProps {
  item: InputReservation;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading?: boolean;
}

export default function ConfirmReservationModal({
  isOpen,
  setIsOpen,
  item,
  isLoading,
}: ConfirmModalProps) {
  const navigate = useNavigate();
  const handleCloseModal = () => {
    if (!isLoading) {
      setIsOpen(false);
    }
  };

  const createReservationMutation = useNotifiedMutation({
    mutationFn: createReservation,

    onSuccess: () => {
      invalidateAllQueries(queryClient, "reservations");
      handleCloseModal();
      navigate("/reservations");
    },
    showSuccessNotification: true,
  });

  return (
    <Dialog open={isOpen} onClose={handleCloseModal}>
      <DialogTitle>
        <Stack direction={"row"} gap={2}>
          <Icon />
          <Typography variant="h4">{"Confirm item"}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            gap: 2,
            padding: 2,
          }}
        >
          <DatePicker
            sx={{ width: "100%" }}
            label={"Date from"}
            value={item.dateFrom ? dayjs.utc(item.dateFrom) : undefined}
          />
          <DatePicker
            sx={{ width: "100%" }}
            label={"Date to"}
            value={item.dateTo ? dayjs.utc(item.dateTo) : undefined}
          />

          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "center",
              padding: 1,
              backgroundColor: "#f5f5f5",
              borderRadius: 1,
              textAlign: "center",
            }}
          >
            {item.numberOfGuests}{" "}
            {item.numberOfGuests === 1 ? "guest" : "guests"}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          onClick={handleCloseModal}
          disabled={isLoading}
        >
          {"Cancel"}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            createReservationMutation.mutate({
              ...item,
            });
          }}
          disabled={isLoading}
        >
          {"Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
