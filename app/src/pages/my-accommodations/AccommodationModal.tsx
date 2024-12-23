import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import queryClient, { invalidateAllQueries } from "../../query-client";
import useNotifiedMutation from "@ui/hooks/useNotifiedMutation";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormData } from "@api/utils";
import { useLoaderData } from "react-router-dom";
import { useAccommodationModalStore } from "@stores/accommodationStore";
import {
  Facility,
  InputAccommodation,
} from "@api/accommodations/accommodations";
import accommodationSchema from "./schema";
import ImageFilePicker from "@ui/shared/ImageFilePicker";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function AccommodationModal() {
  const theme = useTheme();
  const { isOpen, item, closeModal, submitAction, shouldClose } =
    useAccommodationModalStore();
  const [hasChanged, setHasChanged] = useState(false);
  const pricingStrategies = useMemo(() => ["PER_GUEST", "PER_UNIT"], []);
  const approvalStrategies = useMemo(() => ["MANUAL", "AUTOMATIC"], []);

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const handleImageChange = (newImages: File[]) => {
    setUploadedImages(newImages); // Update state with the new images
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  //   const facilities = useLoaderData() as Facility[];
  const facilities = [
    { id: "1", name: "Wi-Fi" },
    { id: "2", name: "Swimming Pool" },
    { id: "3", name: "Gym" },
    { id: "4", name: "Fireplace" },
    { id: "5", name: "Hot Tub" },
    { id: "6", name: "Parking Lot" },
    { id: "7", name: "Air Conditioning" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    control,
    // setValue,
    formState: { errors, isValid },
  } = useForm<InputFormData<InputAccommodation>>({
    resolver: zodResolver(accommodationSchema),
  });

  useEffect(() => reset(), [isOpen, reset]);

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "accommodations");
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

  const saveAccommodation = (newItem: InputFormData<InputAccommodation>) => {
    if (isValid) {
      mutation.mutate(newItem);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => handleCloseModal(hasChanged)}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 1 }}>
          <Grid container direction={"row"} spacing={1}>
            {/* Image Picker Component */}
            <Grid item xs={12} sm={12}>
              <label htmlFor="images">Upload Images</label>
              <Controller
                name="images"
                control={control}
                defaultValue={undefined}
                rules={{ required: true }}
                render={({ field }) => (
                  <ImageFilePicker
                    maxFiles={10}
                    control={control}
                    fileSelectChange={(images) => setUploadedImages(images)}
                    disabled={mutation.isPending}
                    error={!!errors.images}
                    helperText={errors.images?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <input
              type="hidden"
              {...register("body.id", {
                required: false,
                value: item?.id ?? undefined,
              })}
            />
            <Grid item xs={12} sm={6}>
              <Controller
                name="body.name"
                control={control}
                defaultValue={item?.name ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Name"}
                    fullWidth
                    required
                    disabled={mutation.isPending}
                    error={!!errors.body?.name}
                    helperText={errors.body?.name?.message}
                    placeholder={"Name"}
                    margin="normal"
                    id="name"
                    autoFocus
                    {...field}
                  />
                )}
              />

              <Grid item xs={12} sm={6}>
                <Controller
                  name="body.country"
                  control={control}
                  defaultValue={item?.country ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Country"}
                      fullWidth
                      required
                      disabled={mutation.isPending}
                      error={!!errors.body?.country}
                      helperText={errors.body?.country?.message}
                      placeholder={"Country"}
                      margin="normal"
                      id="country"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="body.city"
                  control={control}
                  defaultValue={item?.city ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"City"}
                      fullWidth
                      required
                      disabled={mutation.isPending}
                      error={!!errors.body?.city}
                      helperText={errors.body?.city?.message}
                      placeholder={"City"}
                      margin="normal"
                      id="city"
                      autoFocus
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Controller
                  name="body.address"
                  control={control}
                  defaultValue={item?.address ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Address"}
                      fullWidth
                      required
                      disabled={mutation.isPending}
                      error={!!errors.body?.address}
                      helperText={errors.body?.address?.message}
                      placeholder={"Adddress"}
                      margin="normal"
                      id="address"
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="body.minimumGuests"
                  control={control}
                  defaultValue={item?.minimumGuests ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Minimum guests"}
                      fullWidth
                      required
                      type="number"
                      disabled={mutation.isPending}
                      error={!!errors.body?.minimumGuests}
                      helperText={errors.body?.minimumGuests?.message}
                      placeholder={"Minimum guests"}
                      margin="normal"
                      id="minimumGuests"
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="body.maximumGuests"
                  control={control}
                  defaultValue={item?.minimumGuests ?? undefined}
                  render={({ field }) => (
                    <TextField
                      label={"Maximum guests"}
                      fullWidth
                      required
                      type="number"
                      disabled={mutation.isPending}
                      error={!!errors.body?.maximumGuests}
                      helperText={errors.body?.maximumGuests?.message}
                      placeholder={"Maximum guests"}
                      margin="normal"
                      id="maximumGuests"
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="body.pricingStrategy"
                  defaultValue={item?.pricingStrategy ?? undefined}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      value={pricingStrategies.find((m) => m === value)}
                      options={pricingStrategies}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={"Type"}
                          margin="normal"
                          variant="outlined"
                          error={errors.body?.pricingStrategy !== undefined}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="body.approvalStrategy"
                  defaultValue={item?.approvalStrategy ?? undefined}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      onChange={(event, item) => {
                        onChange(item);
                      }}
                      value={approvalStrategies.find((m) => m === value)}
                      options={approvalStrategies}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={"Type"}
                          margin="normal"
                          variant="outlined"
                          error={errors.body?.approvalStrategy !== undefined}
                        />
                      )}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Controller
                  name="body.facilityIds"
                  control={control}
                  // defaultValue={item?.categories.map((c) => c.id + "") ?? []}
                  defaultValue={item?.facilities?.map((c) => c.id) ?? []}
                  render={({ field }) => (
                    <FormControl sx={{ minWidth: 540 }}>
                      <InputLabel id="demo-multiple-chip-label">
                        Categories
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={field.value}
                        onChange={(e) => {
                          console.log(e);
                          field.onChange(e.target.value);
                        }}
                        input={
                          <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                          />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value, index) => (
                              <Chip key={index} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {facilities.map((facility: Facility) => (
                          <MenuItem
                            key={facility.id}
                            value={facility.id}
                            style={{
                              fontWeight: theme.typography.fontWeightMedium,
                            }}
                          >
                            {`(${facility.id}) ${facility.name}`}
                          </MenuItem>
                        ))}
                      </Select>

                      {errors.body?.facilityIds && (
                        <FormHelperText error>
                          {errors.body?.facilityIds.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
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
    </Dialog>
  );
}
