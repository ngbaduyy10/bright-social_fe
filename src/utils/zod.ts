import { z } from "zod";
import { Gender } from "@/types";

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
    firstName: z
      .string()
      .nonempty("First Name is required")
      .min(2, "First Name must be at least 2 characters long")
      .max(20, "First Name must be at most 20 characters long")
      .regex(/^[a-zA-Z]+$/, "First Name can only contain letters"),
    lastName: z
      .string()
      .nonempty("Last Name is required")
      .min(2, "Last Name must be at least 2 characters long")
      .max(20, "Last Name must be at most 20 characters long")
      .regex(/^[a-zA-Z]+$/, "Last Name can only contain letters"),
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

export const editProfileFormSchema = z.object({
  email: z
    .union([z.string().email("Invalid email format"), z.literal("")])
    .optional(),
  username: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be at most 30 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  first_name: z
    .union([
      z
        .string()
        .min(2, "First Name must be at least 2 characters long")
        .max(20, "First Name must be at most 20 characters long")
        .regex(/^[a-zA-Z]+$/, "First Name can only contain letters"),
      z.literal(""),
    ])
    .optional(),
  last_name: z
    .union([
      z
        .string()
        .min(2, "Last Name must be at least 2 characters long")
        .max(20, "Last Name must be at most 20 characters long")
        .regex(/^[a-zA-Z]+$/, "Last Name can only contain letters"),
      z.literal(""),
    ])
    .optional(),
  gender: z.union([z.enum(Object.values(Gender) as [string, ...string[]]), z.literal("")]).optional(),
  phone: z
    .union([
      z
        .string()
        .regex(
          /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
          "Invalid phone number format"
        ),
      z.literal(""),
    ])
    .optional(),
  bio: z
    .union([
      z.string().max(500, "Bio must be at most 500 characters long"),
      z.literal(""),
    ])
    .optional(),
});

export type EditProfileFormData = z.infer<typeof editProfileFormSchema>;