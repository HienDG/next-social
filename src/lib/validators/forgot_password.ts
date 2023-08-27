import { z } from "zod";

const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
  })
  .required();

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export default forgotPasswordSchema;
