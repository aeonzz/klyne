import * as z from "zod";

export const signinCredential = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Atleast 1 character")
    .max(20, "Cannot exceed 20 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Atleast 1 character")
    .max(30, "Cannot exceed 30 characters")
    .email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Atleast 1 character")
    .max(20, "Cannot exceed 20 characters"),
});

export type SigninCredential = z.infer<typeof signinCredential>;
