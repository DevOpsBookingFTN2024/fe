import {
  deleteAccommodationRatingById,
  deleteHostRatingById,
  getAccommodationRatingByGuest,
  getHostRatingByGuest,
  rateAccommodation,
  rateHost,
  updateAccommodationRatingById,
  updateHostRatingById,
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
import { useQuery } from "@tanstack/react-query";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import queryClient, { invalidateAllQueries } from "../../query-client";

export interface RatingModalProps {
  ratingId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  ratingType: "HOST" | "ACCOMMODATION";
}

export default function RatingModal({
  isOpen,
  setIsOpen,
  ratingId,
  ratingType,
}: RatingModalProps) {
  const closeModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["rating", ratingType],
    queryFn: async () => {
      try {
        return ratingType === "ACCOMMODATION"
          ? await getAccommodationRatingByGuest(ratingId)
          : await getHostRatingByGuest(ratingId);
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: isOpen,
    retry: false,
  });

  const getMutationFn = (actionType: "update" | "create") => {
    if (ratingType === "HOST") {
      return actionType === "update" ? updateHostRatingById : rateHost;
    }
    return actionType === "update"
      ? updateAccommodationRatingById
      : rateAccommodation;
  };

  const ratingMutation = useNotifiedMutation({
    mutationFn: data ? getMutationFn("update") : getMutationFn("create"),
    onSuccess: () => {
      invalidateAllQueries(queryClient, "rating");
      invalidateAllQueries(queryClient, "guests_rating");
      refetch();
    },
    showSuccessNotification: false,
  });

  const deleteRatingMutation = useNotifiedMutation({
    mutationFn:
      ratingType === "HOST"
        ? deleteHostRatingById
        : deleteAccommodationRatingById,
    onSuccess: () => {
      invalidateAllQueries(queryClient, "rating");
      invalidateAllQueries(queryClient, "guests_rating");
      refetch();
    },
    showSuccessNotification: false,
  });

  const handleRatingChange = (newValue: number | null) => {
    if (newValue !== null) {
      ratingMutation.mutate({
        id: data ? data.id : ratingId,
        rating: newValue,
      });
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
            value={data?.rating ?? null}
            onChange={(event, newValue) => handleRatingChange(newValue)}
          />
          <IconButton
            onClick={() =>
              deleteRatingMutation.mutate(data ? data.id : ratingId)
            }
          >
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
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
