import { z } from "zod";

const resetSchema = z
  .object({
    password: z
      .string()
      .min(4, { message: "Password length should be at least 4 characters" })
      .max(30, "Password cannot exceed more than 30 characters"),

    confirmPassword: z
      .string()
      .min(4, { message: "Confirm password length should be at least 4 characters" })
      .max(30, "Confirm password cannot exceed more than 30 characters"),
  })
  .required()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Confirm passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type ResetSchema = z.infer<typeof resetSchema>;

export default resetSchema;
