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
import Grid from "@mui/material/Grid2";

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
    {
      id: "8c736793-8bb6-4195-b821-fbdece5abc6b",
      name: "Wi-Fi",
    },
    {
      id: "eb4c4bad-a94f-4e36-b3cd-d52bc726307f",
      name: "Parking lot",
    },
    {
      id: "33208e8f-c77f-42a9-8669-38fa629685c2",
      name: "TV",
    },
    {
      id: "34348434-5309-46a5-81fa-ea8b5eb09e51",
      name: "Kitchen",
    },
    {
      id: "009a96c0-5381-42ed-8cb2-a7e59476ccad",
      name: "Air condition",
    },
    {
      id: "cb50115a-7845-4e81-a3d0-99e8357573aa",
      name: "Swimming pool",
    },
    {
      id: "394772a3-4a19-4e9b-950f-2efa2e253a0f",
      name: "Fitness center",
    },
    {
      id: "1af6361b-b65d-48ca-b01a-11e4d9a07726",
      name: "Terrace",
    },
    {
      id: "b1f0acb1-5e25-4b6e-90cb-e460e5bf7807",
      name: "Barbecue",
    },
    {
      id: "caa99af1-4da7-4a6c-bbb9-a32a27fa4d37",
      name: "Additional toilet",
    },
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

  useEffect(() => reset(), [isOpen]);

  const handleCloseModal = (hasChanged: boolean) => {
    if (hasChanged) {
      invalidateAllQueries(queryClient, "my_accommodations");
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
        <Box component="form" sx={{ flexGrow: 1 }}>
          <input
            type="hidden"
            {...register("body.id", {
              required: false,
              value: item?.id ?? undefined,
            })}
          />
          <Grid container spacing={1}>
            {/* Image Picker Component */}
            <Grid size={{ xs: 12, sm: 12 }}>
              <label htmlFor="files">Upload Images</label>
              <Controller
                name="files"
                control={control}
                defaultValue={undefined}
                rules={{ required: true }}
                render={({ field }) => (
                  <ImageFilePicker
                    maxFiles={10}
                    control={control}
                    fileSelectChange={(files) => setUploadedImages(files)}
                    disabled={mutation.isPending}
                    error={!!errors.files}
                    helperText={errors.files?.message}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>
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
                    margin="dense"
                    id="name"
                    autoFocus
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="body.country"
                control={control}
                defaultValue={item?.country ?? undefined}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "100%" }}
                    label={"Country"}
                    required
                    disabled={mutation.isPending}
                    error={!!errors.body?.country}
                    helperText={errors.body?.country?.message}
                    placeholder={"Country"}
                    id="country"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="body.city"
                control={control}
                defaultValue={item?.city ?? undefined}
                render={({ field }) => (
                  <TextField
                    sx={{ width: "100%" }}
                    label={"City"}
                    required
                    disabled={mutation.isPending}
                    error={!!errors.body?.city}
                    helperText={errors.body?.city?.message}
                    placeholder={"City"}
                    id="city"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>
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
                    margin="dense"
                    id="address"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
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
                    InputProps={{
                      inputProps: { min: 1 },
                    }}
                    disabled={mutation.isPending}
                    error={!!errors.body?.minimumGuests}
                    helperText={errors.body?.minimumGuests?.message}
                    placeholder={"Minimum guests"}
                    margin="dense"
                    id="minimumGuests"
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="body.maximumGuests"
                control={control}
                defaultValue={item?.maximumGuests ?? undefined}
                render={({ field }) => (
                  <TextField
                    label={"Maximum guests"}
                    fullWidth
                    required
                    type="number"
                    InputProps={{
                      inputProps: { min: 1 },
                    }}
                    disabled={mutation.isPending}
                    error={!!errors.body?.maximumGuests}
                    helperText={errors.body?.maximumGuests?.message}
                    placeholder={"Maximum guests"}
                    margin="dense"
                    id="maximumGuests"
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
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
                        label={"Pricing Strategy"}
                        margin="dense"
                        variant="outlined"
                        error={errors.body?.pricingStrategy !== undefined}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
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
                        label={"Approval strategy"}
                        margin="dense"
                        variant="outlined"
                        error={errors.body?.approvalStrategy !== undefined}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="body.facilityIds"
                control={control}
                // defaultValue={item?.categories.map((c) => c.id + "") ?? []}
                defaultValue={item?.facilities?.map((c) => c.id) ?? []}
                render={({ field }) => (
                  <FormControl sx={{ minWidth: 540 }}>
                    <InputLabel id="demo-multiple-chip-label">
                      Facilities
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={field.value}
                      onChange={(e) => {
                        console.log(e.target.value);
                        field.onChange(e.target.value);
                      }}
                      input={
                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                      }
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value, index) => {
                            // Find the facility with the matching ID
                            const facility = facilities.find(
                              (facility) => facility.id === value
                            );
                            return (
                              <Chip
                                key={index}
                                label={facility?.name || value}
                              />
                            );
                          })}
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
