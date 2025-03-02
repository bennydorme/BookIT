import { z } from "zod";

// Helper function to get today's date in YYYY-MM-DD format
const getToday = () => new Date().toISOString().split('T')[0]; // Returns the date in 'YYYY-MM-DD' format

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  published: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Published date must be in YYYY-MM-DD format")
    .refine((date) => {
      const today = getToday();
      return date <= today; // Ensure the date is not in the future
    }, "Published date cannot be in the future")
    .transform((value) => new Date(value).toISOString()), // Convert to ISO-8601 format
  isbn: z.string()
    .length(13, "ISBN must be exactly 13 characters")
    .regex(/^\d{13}$/, "ISBN must only contain numbers"),
});
