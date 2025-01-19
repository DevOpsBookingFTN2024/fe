import { z } from "zod";

const maxFileSize = import.meta.env.VITE_MAX_FILE_SIZE;
const acceptedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

const imageSchema = z.object({
  image: z
    .custom<File>()
    .refine((file) => file?.size < maxFileSize, "Max file size is 5MB")
    .refine(
      (file) => acceptedImageTypes.includes(file?.type),
      "Allowed file types are JPG, PNG"
    ),
  body: z.coerce.number(),
});

export default imageSchema;
