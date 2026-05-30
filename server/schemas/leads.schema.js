import { z } from "zod";

export const createLeadSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(80, "Name cannot be more than 80 characters")
      .optional()
      .default("Unknown Lead"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email address")
      .optional()
      .nullable()
      .default(null),

    phone: z
      .string()
      .trim()
      .min(7, "Phone number is too short")
      .max(15, "Phone number is too long")
      .optional()
      .nullable()
      .default(null),

    message: z
      .string()
      .trim()
      .max(1000, "Message cannot be more than 1000 characters")
      .optional()
      .default(""),

    source: z
      .string()
      .trim()
      .max(80, "Source cannot be more than 80 characters")
      .optional()
      .default("website"),

    customFields: z
      .record(z.string(), z.any())
      .optional()
      .default({}),
  })
  .refine((data) => data.email || data.phone, {
    message: "Email or phone is required",
    path: ["email"],
  });