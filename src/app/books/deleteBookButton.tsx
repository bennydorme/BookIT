"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleDelete } from "./handleDelete"; 

export default function DeleteBookButton({ bookId }: { bookId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteConfirmation = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    setIsDeleting(true);

    const response = await handleDelete(bookId);

    if (response.success) {
        alert('Book sucessfully deleted!');
        setTimeout(() => {
            router.push("/books"); 
          }, 100);
    } else {
        alert('Could not delete book, please contact support');
      alert(`Error: ${response.error}`);
    }

    setIsDeleting(false);
  };

  return (
    <button
      onClick={handleDeleteConfirmation}
      style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
