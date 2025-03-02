import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PrismaClient, Book } from "@prisma/client";
import prisma from "../../../../lib/prisma";

export default function EditBookPage() {
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [isbn, setIsbn] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Make sure id is available and is a valid number before proceeding
    if (id && !isNaN(Number(id))) {
      const fetchBook = async () => {
        try {
          const bookData = await prisma.book.findUnique({ where: { id: id.toString() } });
          if (bookData) {
            setBook(bookData);
            setTitle(bookData.title);
            setAuthor(bookData.author);
            setPublished(bookData.published.toString());
            setIsbn(bookData.isbn);
          } else {
            setError("Book not found.");
          }
        } catch (err) {
          setError("Error fetching book details.");
        }
      };

      fetchBook();
    } else {
      setError("Invalid book ID.");
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || isNaN(Number(id))) {
      setError("Invalid book ID.");
      return;
    }

    try {
      await prisma.book.update({
        where: { id: id.toString() },
        data: {
          title,
          author,
          published: new Date(published),
          isbn,
        },
      });

      router.push("/books");
    } catch (err) {
      setError("Error updating book.");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Edit Book</h2>
      {book && (
        <form onSubmit={handleSubmit}>
          <div>
            <label  htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="published">Published Date</label>
            <input
              type="date"
              id="published"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="isbn">ISBN</label>
            <input
              type="text"
              id="isbn"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              required
            />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}
