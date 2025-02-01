import {
  deleteAccommodationRatingById,
  deleteHostRatingById,
  rateAccommodation,
  rateHost,
  updateAccommodationRatingById,
  updateHostRatingById
} from "@api/accommodations/rating";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";

export interface RatingModalProps {
  rating: number;
  ratingId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isLoading?: boolean;
  ratingType: "HOST" | "ACCOMMODATION";
}

export default function RatingModal({
  isOpen,
  setIsOpen,
  ratingId,
  isLoading = false,
  ratingType,
  rating,
}: RatingModalProps) {
  const closeModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  const getMutationFn = (actionType: "update" | "create") => {
    if (ratingType === "HOST") {
      return actionType === "update" ? updateHostRatingById : rateHost;
    }
    return actionType === "update"
      ? updateAccommodationRatingById
      : rateAccommodation;
  };

  const ratingMutation = useNotifiedMutation({
    mutationFn: rating ? getMutationFn("update") : getMutationFn("create"),
    onSuccess: closeModal,
    showSuccessNotification: true,
  });

  const deleteRatingMutation = useNotifiedMutation({
    mutationFn:
      ratingType === "HOST"
        ? deleteHostRatingById
        : deleteAccommodationRatingById,
    onSuccess: closeModal,
    showSuccessNotification: true,
  });

  const handleRatingChange = (newValue: number | null) => {
    if (newValue !== null) {
      ratingMutation.mutate({ id: ratingId, rating: newValue });
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle>
        <Stack direction="row" gap={2} alignItems="center">
          <Typography variant="h4">Rate {ratingType.toLowerCase()}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: 2,
          }}
        >
          <Typography component="legend">Your Rating</Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => handleRatingChange(newValue)}
          />
          <IconButton onClick={() => deleteRatingMutation.mutate(ratingId)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          onClick={closeModal}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
