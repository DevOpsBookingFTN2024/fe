import { z } from "zod";

const availabilitySchema = z.object({
  id: z.string().optional(),
  accommodationId: z.string().optional(),
  dateFrom: z.date(),
  dateTo: z.date(),
  isAvailable: z.coerce.boolean(),
  pricePerGuest: z.coerce.number(),
  pricePerUnit: z.coerce.number(),
});

export default availabilitySchema;
