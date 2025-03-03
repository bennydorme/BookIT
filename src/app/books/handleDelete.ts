"use server";

import { deleteBook } from "../../../lib/actions/api/books/bookActions"; // Adjust import
import { revalidatePath } from "next/cache";

export async function handleDelete(id: string) {
  if (!id) return { success: false, error: "Missing book ID" };

  try {
    const response = await deleteBook(id);
    if (response.success) {

      revalidatePath("/books"); // Refresh the book list
      return { success: true };
    } else {
      console.error(response.error);
      return { success: false, error: response.error };
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    return { success: false, error: "Internal server error" };
  }
}
