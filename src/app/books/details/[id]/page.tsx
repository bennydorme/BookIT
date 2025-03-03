'use client'; // Mark as client-side component to use React hooks

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Use `useParams` from next/navigation
import { getBookById } from "../../../../../lib/actions/api/books/bookActions"; // Import getBookById
import DeleteBookButton from "../../deleteBookButton"; // Import the new client component
import Link from "next/link";
export default function BookDetailPage() {
  const [book, setBook] = useState<{ title: string; author: string; published?: string; isbn: string; id: string } | null>(null); // State to store the fetched book
  const [error, setError] = useState<string | null>(null); // State for error handling
  const { id } = useParams() as { id: string }; // Get the ID from URL params and assert it as a string

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const fetchedBook = await getBookById(id); // Fetch the book by ID
          if (fetchedBook) {
            setBook({
              ...fetchedBook,
              published: fetchedBook.published ? fetchedBook.published.toISOString() : undefined
            }); // Set the book data
          } else {
            setError("Book not found.");
          }
        } catch (err) {
          setError("Error fetching book details.");
        }
      };

      fetchBook(); // Call the fetch function when the component mounts or ID changes
    }
  }, [id]); 

  if (error) return <div>{error}</div>; // Handle error if the book is not found
  if (!book) return <div>Loading...</div>; // Show loading while fetching book details

  return (
    <div>
      <h2>Book Details</h2>
      <div>
        <strong>Title:</strong> {book.title} <br />
        <strong>Author:</strong> {book.author} <br />
        <strong>Published Date:</strong> {book.published ? new Date(book.published).toLocaleDateString() : "N/A"} <br />
        <strong>ISBN:</strong> {book.isbn} <br />
      </div>
      <div style={{ marginTop: "20px" }}>
        <DeleteBookButton bookId={book.id} /> {/* Use the client component here */}
      </div>
      <Link href={`/books`} style={{ color: "blue", textDecoration: "underline", marginRight: "10px" }}>
                     Go back to book list
                    </Link>
    </div>
  );
}

