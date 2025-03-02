"use server";  // Mark as a server-side action
import { ZodError } from "zod"; // Import ZodError for better error handling
import prisma from "../../../../lib/prisma";
import { bookSchema } from "../../../../lib/validation"; // Import Zod schema

// Fetch all books
export async function getBooks() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { published: "desc" }, // Order by most recent published date
    });
    return books;
  } catch (error) {
    console.error("Error fetching books:", error); // More context in logs
    return []; // Return an empty array if there is an error
  }
}

// Create a new book with detailed validation error messages
export async function createBook(formData: FormData) {
  try {
    const data = {
      title: formData.get("title"),
      author: formData.get("author"),
      published: formData.get("published"),
      isbn: formData.get("isbn"),
    };

    // Check if any required fields are missing
    if (!data.title || !data.author || !data.published || !data.isbn) {
      return { success: false, error: "All fields are required" };
    }

    // Validate using Zod
    const validatedData = bookSchema.parse(data);

    // Create the new book in the database
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
    if (error instanceof ZodError) {  // Ensure we're catching validation errors correctly
      // Extract validation issues
      const validationErrors = error.errors.map((err) => ({
        field: err.path.join("."), // Get the field name
        message: err.message, // Zod-generated error message
      }));

      return { success: false, errors: validationErrors };
    }

    console.error("Unexpected error:", error); // Log unexpected errors
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

// Get book by Id
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
    console.error("Error fetching book by ID:", error);
    return null;
  }
}

// Update a book by ID
export async function updateBook(id: string, bookData: any) {
  try {
    const validatedData = bookSchema.partial().parse(bookData);

    const updatedBook = await prisma.book.update({
      where: { id },
      data: validatedData,
    });

    console.log("Update successful:", updatedBook);
    return updatedBook;
  } catch (error) {
    console.log("Update failed:", error);
    console.error("Error updating book:", error);
    return null;
  }
}

// Delete a book by ID
export async function deleteBook(id: string) {
  try {
    const deletedBook = await prisma.book.delete({
      where: { id },
    });

    return { success: true, book: deletedBook };
  } catch (error) {
    console.error("Error deleting book:", error);
    return { success: false, error: "Failed to delete book." };
  }
}
