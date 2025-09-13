import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("Invalid email format"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .nonempty("Username is required")
      .min(4, "Username must be at least 4 characters long")
      .max(20, "Username must be at most 20 characters long"),
    email: z.email("Invalid email format"),
    phone: z
      .string()
      .nonempty("Phone number is required")
      .regex(/^\d+$/, "Phone number must contain only digits"),
    password: z
      .string()
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .nonempty("Confirm Password is required")
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });