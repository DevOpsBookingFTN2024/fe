import { date, z } from "zod";

const availabilitySchema = z.object({
  accommodationId: z.string().optional(),
  dateFrom: z.date(),
  dateTo: z.date(),
  pricePerGuest: z.number(),
  pricePerUnit: z.number(),
});

export default availabilitySchema;
