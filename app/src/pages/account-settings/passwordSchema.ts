import { z } from "zod";
const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const passwordSchema = z
  .object({
    oldPassword: z
      .string({
        required_error: "Current password is required.",
      })
      .min(8, {
        message: "Current password must be at least 8 characters long.",
      })
      .max(standardMaxLength, {
        message: `Current password must not exceed ${standardMaxLength} characters.`,
      }),
    newPassword: z
      .string({
        required_error: "New password is required.",
      })
      .min(8, {
        message: "New password must be at least 8 characters long.",
      })
      .max(standardMaxLength, {
        message: `New password must not exceed ${standardMaxLength} characters.`,
      }),
    repeatNewPassword: z
      .string({
        required_error: "Confirmation password is required.",
      })
      .min(8, {
        message: "Confirmation password must be at least 8 characters long.",
      })
      .max(standardMaxLength, {
        message: `Confirmation password must not exceed ${standardMaxLength} characters.`,
      }),
  })
  .partial()
  .superRefine((data, ctx) => {
    if (data.oldPassword === data.repeatNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["newPassword"],
        message: "New password cannot be the same as the current password.",
      });
    } else if (data.newPassword !== data.repeatNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["repeatNewPassword"],
        message: "Passwords do not match.",
      });
    }
  });

export default passwordSchema;
