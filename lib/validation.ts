import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  published: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Published date must be in YYYY-MM-DD format")
    .transform((value) => new Date(value).toISOString()),  // Convert to ISO-8601 format
  isbn: z.string().length(13, "ISBN must be 13 characters"),
});
