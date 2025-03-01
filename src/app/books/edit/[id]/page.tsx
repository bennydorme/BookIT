"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateBook, getBookById } from "../../../../../lib/actions/api/books/bookActions";

export default function EditBookPage({ params }: { params: { id: string } }) {
  const [id, setId] = useState<string | null>(null); // Initializing state to handle dynamic ID
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState("");

  // Await the `params` object to ensure we have the ID before using it
  useEffect(() => {
    if (params && params.id) {
      setId(params.id);  // Set the ID in state after ensuring it's available
    }
  }, [params]);

  // Fetch book details when the ID is available
  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        try {
          const book = await getBookById(id);
          if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setPublished(new Date(book.published).toISOString().split("T")[0]);
            setIsbn(book.isbn);
          } else {
            setError("Book not found.");
          }
        } catch (err) {
          setError("Error fetching book details.");
        }
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (id) {
        await updateBook(id, { title, author, published, isbn });
        router.push("/books"); // Redirect to books list
      }
    } catch (err) {
      setError("Error updating book.");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Author</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>Published Date</label>
          <input type="date" value={published} onChange={(e) => setPublished(e.target.value)} required />
        </div>
        <div>
          <label>ISBN</label>
          <input value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
