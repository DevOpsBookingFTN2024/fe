import { z } from "zod";

// Base schema without pricing fields
const baseAvailabilitySchema = z.object({
  id: z.string().optional(),
  accommodationId: z.string().optional(),
  dateFrom: z.date(),
  dateTo: z.date(),
  isAvailable: z.coerce.boolean(),
});

// Schema for PER_GUEST pricing strategy
const perGuestAvailabilitySchema = baseAvailabilitySchema.extend({
  pricePerGuest: z.coerce.number({
    invalid_type_error: "Must be a number.",
    required_error: "Field is required.",
  }),
  pricePerUnit: z.coerce.number().optional(),
});

// Schema for PER_UNIT pricing strategy
const perUnitAvailabilitySchema = baseAvailabilitySchema.extend({
  pricePerUnit: z.coerce.number({
    invalid_type_error: "Must be a number.",
    required_error: "Field is required.",
  }),
  pricePerGuest: z.coerce.number().optional(),
});

// Function to get the appropriate schema based on pricing strategy
export const getAvailabilitySchema = (pricingStrategy?: "PER_GUEST" | "PER_UNIT") => {
  if (pricingStrategy === "PER_GUEST") {
    return perGuestAvailabilitySchema;
  } else if (pricingStrategy === "PER_UNIT") {
    return perUnitAvailabilitySchema;
  }
  // Default schema with both fields required (for backward compatibility)
  return baseAvailabilitySchema.extend({
    pricePerGuest: z.coerce.number({
      invalid_type_error: "Must be a number.",
      required_error: "Field is required.",
    }),
    pricePerUnit: z.coerce.number({
      invalid_type_error: "Must be a number.",
      required_error: "Field is required.",
    }),
  });
};

// Default export for backward compatibility
const availabilitySchema = getAvailabilitySchema();
export default availabilitySchema;
