import { z } from "zod";
const standardMaxLength = import.meta.env.VITE_STANDARD_FIELD_MAX_LENGTH;

const accountSchema = z.object({
  username: z
    .string({
      required_error: "Username is required.",
    })
    .max(standardMaxLength, {
      message: `Username must not exceed ${standardMaxLength} characters.`,
    }),
  emailAddress: z
    .string({
      required_error: "Email is required.",
    })
    .email({
      message: "Email format is invalid.",
    }),
  firstname: z
    .string({
      required_error: "First name is required.",
    })
    .min(1, {
      message: "First name must be at least 3 characters long.",
    })
    .max(standardMaxLength, {
      message: `First name must not exceed ${standardMaxLength} characters.`,
    }),
  lastname: z
    .string({
      required_error: "Last name is required.",
    })
    .min(1, {
      message: "Last name must be at least 3 characters long.",
    })
    .max(standardMaxLength, {
      message: `Last name must not exceed ${standardMaxLength} characters.`,
    }),
  residence: z
    .string({
      required_error: "Residence is required.",
    })
    .max(standardMaxLength, {
      message: `Residence must not exceed ${standardMaxLength} characters.`,
    }),
  role: z.any(),
});

export default accountSchema;
