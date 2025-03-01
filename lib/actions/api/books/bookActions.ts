// /app/api/books/bookActions.ts
"use server";  // Mark as a server-side action

import prisma from "../../../../lib/prisma";
import { bookSchema } from "../../../../lib/validation";  // Assuming you have a schema to validate book data

export async function createBook(formData: FormData) {
  try {
    const data = {
      title: formData.get("title"),
      author: formData.get("author"),
      published: formData.get("published"),
      isbn: formData.get("isbn"),
    };

    const validatedData = bookSchema.parse(data);  // Validate data

    const newBook = await prisma.book.create({
      data: {
        title: validatedData.title,
        author: validatedData.author,
        published: new Date(validatedData.published),
        isbn: validatedData.isbn,
      },
    });

    return { success: true, book: newBook };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}
