import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("Invalid email format"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z
  .object({
    username: z
      .string()
      .nonempty("Username is required")
      .min(2, "Username must be at least 2 characters long")
      .max(20, "Username must be at most 20 characters long")
      .regex(/^[a-zA-Z]+$/, "Username can only contain letters"),
    email: z.email("Invalid email format"),
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

export type RegisterFormData = z.infer<typeof registerFormSchema>;