import { z } from "zod";

const maxFileSize = import.meta.env.VITE_MAX_FILE_SIZE;
const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;
const acceptedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

const accommodationSchema = z.object({
  images: z
    .array(
      z
        .custom<File>()
        .refine((file) => file.size < maxFileSize, "Max file size is 5MB")
        .refine(
          (file) => acceptedImageTypes.includes(file.type),
          "Allowed file types"
        )
    )
    .refine((files) => files.length > 0, "At least one image is required.")
    .optional(),
  body: z.object({
    id: z.string().optional(),
    name: z
      .string({
        required_error: "Name is required.",
      })
      .min(1, {
        message: "Name must be at least 3 characters long.",
      })
      .max(standardMaxLength, {
        message: `Name must not exceed ${standardMaxLength} characters.`,
      }),
    address: z
      .string({
        required_error: "Residence is required.",
      })
      .min(1, {
        message: "Address must be at least 3 characters long.",
      })
      .max(standardMaxLength, {
        message: `Address must not exceed ${standardMaxLength} characters.`,
      }),
    city: z
      .string({
        required_error: "City is required.",
      })
      .min(1, {
        message: "City must be at least 3 characters long.",
      })
      .max(standardMaxLength, {
        message: `City must not exceed ${standardMaxLength} characters.`,
      }),
    country: z
      .string({
        required_error: "Country is required.",
      })
      .min(1, {
        message: "Country must be at least 3 characters long.",
      })
      .max(standardMaxLength, {
        message: `Country must not exceed ${standardMaxLength} characters.`,
      }),
    minimumGuests: z.coerce
      .number({
        invalid_type_error: "Must be a number.",
        required_error: "Field is required.",
      })
      .min(1, {
        message: "There must be at least 1 guest.",
      }),
    maximumGuests: z.coerce
      .number({
        invalid_type_error: "Must be a number.",
        required_error: "Field is required.",
      })
      .max(100, {
        message: "There must be at most 100 guests.",
      }),
    pricingStrategy: z.string({
      required_error: "Status is required.",
    }),
    approvalStrategy: z.string({
      required_error: "Status is required.",
    }),
    facilityIds: z.array(
      z.coerce
        .number({
          required_error: "Facility ID must be a number.",
        })
        .optional()
    ),
  }),
});

export default accommodationSchema;
