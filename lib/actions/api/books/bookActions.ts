"use server";  // Mark as a server-side action

import prisma from "../../../../lib/prisma";
import { bookSchema } from "../../../../lib/validation"; // Import Zod schema

// Create a new book
export async function createBook(formData: FormData) {
  try {
    const data = {
      title: formData.get("title"),
      author: formData.get("author"),
      published: formData.get("published"),
      isbn: formData.get("isbn"),
    };

    const validatedData = bookSchema.parse(data); // Validate using Zod

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

// Get a book by ID (✅ Fixed: No need for fetch, use Prisma directly)
export async function getBookById(id: string) {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new Error("Book not found");
    }

    return book;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
}

// Update a book by ID (✅ Fixed: Use Prisma instead of fetch)
export async function updateBook(id: string, bookData: any) {
  try {
    const validatedData = bookSchema.partial().parse(bookData); 

    const updatedBook = await prisma.book.update({
      where: { id },
      data: validatedData,
    });
    console.log('correu updated - '+  updatedBook);
    return updatedBook;

  } catch (error) {
    console.log('correu mal o updated - '+ error);
    console.error("Error updating book:", error);
    return null;
  }
}
