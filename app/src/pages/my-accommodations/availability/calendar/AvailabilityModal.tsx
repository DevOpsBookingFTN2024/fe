import { InputAvailability } from "@api/accommodations/availability";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
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
import { getAvailabilitySchema } from "./schema";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function AvailabilityModal() {
  const { isOpen, isUpdate, item, closeModal, submitAction, shouldClose, pricingStrategy } =
    useAvailabilityModalStore();
  const [hasChanged, setHasChanged] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<InputAvailability>({
    resolver: zodResolver(getAvailabilitySchema(pricingStrategy)),
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
        <Box component="form" sx={{ flexGrow: 1 }}>
          <input
            type="hidden"
            {...register("id", {
              required: false,
              value: item?.id ?? undefined,
            })}
          />
          <input
            type="hidden"
            {...register("accommodationId", {
              required: false,
              value: item?.accommodationId ?? undefined,
            })}
          />
          <input
            type="hidden"
            {...register("isAvailable", {
              required: false,
              value: true,
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
                    disabled={item?.isReserved}
                    label={"Date from"}
                    value={
                      value
                        ? dayjs.utc(value).tz("Europe/Paris").endOf("day").utc()
                        : undefined
                    }
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        error: !!errors.dateFrom,
                        helperText: errors.dateFrom?.message,
                        id: "dateFrom",
                      },
                    }}
                    onChange={(newValue) =>
                      onChange(
                        newValue
                          ? newValue.tz("Europe/Paris").endOf("day").toDate()
                          : null
                      )
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
                    disabled={item?.isReserved}
                    label={"Date to"}
                    value={
                      value
                        ? dayjs.utc(value).tz("Europe/Paris").endOf("day").utc()
                        : undefined
                    }
                    slotProps={{
                      textField: {
                        variant: "outlined",
                        error: !!errors.dateTo,
                        helperText: errors.dateTo?.message,
                        id: "dateTo",
                      },
                    }}
                    onChange={(newValue) =>
                      onChange(
                        newValue
                          ? newValue.tz("Europe/Paris").endOf("day").toDate()
                          : null
                      )
                    }
                    timezone="Europe/Paris"
                    {...props}
                  />
                )}
              />
            </Grid>

            {/* Show Price per Guest field only for PER_GUEST strategy or when no strategy is set (backward compatibility) */}
            {(!pricingStrategy || pricingStrategy === "PER_GUEST") && (
              <Grid size={{ xs: 12, sm: pricingStrategy === "PER_GUEST" ? 12 : 6 }}>
                <Controller
                  name="pricePerGuest"
                  control={control}
                  defaultValue={item?.pricePerGuest ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Price per guest"}
                      disabled={item?.isReserved}
                      fullWidth
                      type="number"
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
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
            )}

            {/* Show Price per Unit field only for PER_UNIT strategy or when no strategy is set (backward compatibility) */}
            {(!pricingStrategy || pricingStrategy === "PER_UNIT") && (
              <Grid size={{ xs: 12, sm: pricingStrategy === "PER_UNIT" ? 12 : 6 }}>
                <Controller
                  name="pricePerUnit"
                  control={control}
                  defaultValue={item?.pricePerUnit ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Price per unit"}
                      fullWidth
                      type="number"
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                      disabled={mutation.isPending || item?.isReserved}
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
            )}
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
          variant="outlined"
          color="info"
        >
          Cancel
        </Button>
        {isUpdate && item?.isAvailable && (
          <Button
            onClick={() => {
              setValue("isAvailable", false);
              handleSubmit(saveAccommodation)();
            }}
            disabled={mutation.isPending || item.isReserved}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        )}
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit(saveAccommodation)}
          disabled={item?.isReserved}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
