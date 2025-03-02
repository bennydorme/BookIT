"use server";

import { deleteBook } from "../../../lib/actions/api/books/bookActions"; // Adjust import
import { revalidatePath } from "next/cache";

export async function handleDelete(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;

  const response = await deleteBook(id);
  if (response.success) {
    revalidatePath("/books"); // Refresh the book list
  } else {
    console.error(response.error);
  }
}
