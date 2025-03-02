"use client"; // Make this a client-side component

import { useState } from "react";

export default function DeleteBookButton({ bookId }: { bookId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirmation = async (e: React.FormEvent) => {
    e.preventDefault();

    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (confirmed) {
      setIsDeleting(true); // Set deleting state to show loading (optional)
      
      // Form submission logic
      const formData = new FormData();
      formData.append("id", bookId);

      const response = await fetch("/books", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.reload(); // Refresh the page after deletion
      } else {
        alert("Failed to delete the book.");
        setIsDeleting(false); // Reset deleting state on error
      }
    }
  };

  return (
    <form onSubmit={handleDeleteConfirmation} style={{ display: "inline" }}>
      <input type="hidden" name="id" value={bookId} />
      <button type="submit" style={{ color: "red", border: "none", background: "none", cursor: "pointer" }} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}
