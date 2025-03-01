import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  published: z.string().refine((value) => {
    return value === "" || !isNaN(Date.parse(value));
  }, {
    message: "Published date must be a valid date or empty",
  }),
  isbn: z.string().length(13, "ISBN must be 13 characters"),
});
