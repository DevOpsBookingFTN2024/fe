import { InputAvailability } from "@api/accommodations/availability";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker } from "@mui/x-date-pickers";
import { useAvailabilityModalStore } from "@stores/availabilityStore";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import dayjs from "dayjs";
import "dayjs/locale/de";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import queryClient, { invalidateAllQueries } from "../../../../query-client";
import availabilitySchema from "./schema";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function AvailabilityModal() {
  const { isOpen, item, closeModal, submitAction, shouldClose } =
    useAvailabilityModalStore();
  const [hasChanged, setHasChanged] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    // setValue,
    formState: { errors, isValid },
  } = useForm<InputAvailability>({
    resolver: zodResolver(availabilitySchema),
  });

  useEffect(() => reset(), [isOpen, reset]);

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "availabilities");
    }
    closeModal();
  };

  const mutation = useNotifiedMutation({
    mutationFn: submitAction,
    onSuccess: () => {
      if (shouldClose) {
        handleCloseModal(true);
      }
      setHasChanged(true);
      reset();
    },
    showSuccessNotification: true,
  });

  const saveAccommodation = (newItem: InputAvailability) => {
    if (isValid) {
      mutation.mutate(newItem);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleCloseModal(hasChanged)}
      fullWidth
      maxWidth="xs"
    >
      <DialogContent>
        {/*           
          <Typography mb={3} variant="subtitle2">
            {!update
              ? "To add Event kindly fillup the title and choose the event color and press the add button"
              : "To Edit/Update Event kindly change the title and choose the event color and press the update button"}
            {slot?.title}
          </Typography> */}

        <Box component="form" sx={{ flexGrow: 1 }}>
          <input
            type="hidden"
            {...register("accommodationId", {
              required: false,
              value: item?.accommodationId ?? undefined,
            })}
          />
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="dateFrom"
                control={control}
                defaultValue={item?.dateFrom ?? new Date()}
                rules={{ required: true }}
                render={({ field: { value, onChange, ...props } }) => (
                  <DatePicker
                    sx={{ width: "100%" }}
                    label={"Date from"}
                    value={value ? dayjs.utc(value) : undefined}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        error: !!errors.dateFrom,
                        helperText: errors.dateFrom?.message,
                        id: "dateFrom",
                      },
                    }}
                    onChange={(newValue) =>
                      onChange(newValue == null ? null : newValue.utc())
                    }
                    timezone="Europe/Paris"
                    {...props}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="dateTo"
                control={control}
                defaultValue={item?.dateTo ?? new Date()}
                rules={{ required: true }}
                render={({ field: { value, onChange, ...props } }) => (
                  <DatePicker
                    sx={{ width: "100%" }}
                    label={"Date to"}
                    value={value ? dayjs.utc(value) : undefined}
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        error: !!errors.dateTo,
                        helperText: errors.dateTo?.message,
                        id: "dateTo",
                      },
                    }}
                    onChange={(newValue) =>
                      onChange(newValue == null ? null : newValue.utc())
                    }
                    timezone="Europe/Paris"
                    {...props}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="pricePerGuest"
                control={control}
                defaultValue={item?.pricePerGuest ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Price per guest"}
                    fullWidth
                    required
                    type="number"
                    InputProps={{
                      inputProps: { min: 1 },
                    }}
                    disabled={mutation.isPending}
                    error={!!errors.pricePerGuest}
                    helperText={errors.pricePerGuest?.message}
                    placeholder={"Price per guest"}
                    margin="normal"
                    id="pricePerGuest"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="pricePerUnit"
                control={control}
                defaultValue={item?.pricePerUnit ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Price per unit"}
                    fullWidth
                    required
                    type="number"
                    InputProps={{
                      inputProps: { min: 1 },
                    }}
                    disabled={mutation.isPending}
                    error={!!errors.pricePerUnit}
                    helperText={errors.pricePerUnit?.message}
                    placeholder={"Price per unit"}
                    margin="normal"
                    id="pricePerUnit"
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      {/* ------------------------------------------- */}
      {/* Action for dialog */}
      {/* ------------------------------------------- */}
      <DialogActions>
        <Button
          onClick={() => handleCloseModal(hasChanged)}
          disabled={mutation.isPending}
          variant="contained"
          color="error"
        >
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit(saveAccommodation)}
        >
          Save
        </Button>
      </DialogActions>
      {/* <Button onClick={handleClose}>Cancel</Button>

          {update ? (
            <Button
              type="submit"
              color="error"
              variant="contained"
              onClick={() => deleteHandler(update)}
            >
              Delete
            </Button>
          ) : (
            ""
          )}
          <Button type="submit" disabled={!title} variant="contained">
            {update ? "Update Event" : "Add Event"}
          </Button>
        </DialogActions>
      </form> */}
    </Dialog>
  );
}
