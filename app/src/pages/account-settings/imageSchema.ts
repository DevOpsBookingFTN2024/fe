import { z } from 'zod';
import i18n from '../../i18n';

const maxFileSize = import.meta.env.VITE_MAX_FILE_SIZE;
const acceptedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

const imageSchema = z.object({
  image: z
    .custom<File>()
    .refine(
      (file) => file?.size < maxFileSize,
      i18n.t('util.maxFileSize', { num: 5 })
    )
    .refine(
      (file) => acceptedImageTypes.includes(file?.type),
      i18n.t('specialOffer.allowedFileTypes')
    ),
  body: z.coerce.number(),
});

export default imageSchema;
