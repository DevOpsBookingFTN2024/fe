import {
  getAccommodationRatingsByAccommodationId,
  getHostRatingsByHost,
} from "@api/accommodations/rating";
import {
  Dialog,
  DialogTitle,
  Stack,
  Typography,
  DialogContent,
  Box,
  DialogActions,
  Button,
  Rating,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Scrollbar from "@ui/custom-scroll/Scrollbar";
import Spinner from "@ui/view/spinner/Spinner";

export interface GuestsRatingsModalProps {
  ratingId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  ratingType: "HOST" | "ACCOMMODATION";
}

export default function GuestsRatingsModal({
  isOpen,
  setIsOpen,
  ratingId,
  ratingType,
}: GuestsRatingsModalProps) {
  const closeModal = () => {
    if (!isLoading) setIsOpen(false);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["guests_rating", ratingType],
    queryFn: async () => {
      try {
        return ratingType === "ACCOMMODATION"
          ? await getAccommodationRatingsByAccommodationId(ratingId)
          : await getHostRatingsByHost(ratingId);
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
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle>
        <Stack direction="row" gap={2} alignItems="center">
          <Typography variant="h4">Ratings</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers >
        {isLoading ? (
          <Spinner />
        ) : data?.length > 0 ? (
          <Scrollbar sx={{  width : "350px" }} >
            <Stack spacing={2} padding={2} >
              {data.map((rating : any) => (
                <Box
                  key={rating.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 1,
                    backgroundColor: "background.paper",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems={"center"}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      Guest: {rating.guest}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(rating.dateTime).toLocaleDateString()}{" "}
                      {/* Only Date */}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Rating value={rating.rating} readOnly />
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Scrollbar>
        ) : (
          <Typography variant="body1" color="text.secondary" textAlign="center">
            No ratings available.
          </Typography>
        )}
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
