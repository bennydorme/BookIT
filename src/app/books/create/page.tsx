"use client"; // Ensure it's a client component
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createBook } from "../../../../lib/actions/api/books/bookActions"; // Server-side action for book creation

export default function CreateBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState<string | string[]>(""); // Can store either string or array of errors
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("published", published);
    formData.append("isbn", isbn);

    const { success, book, error, errors } = await createBook(formData); // Server action

    if (success) {
      alert("Book created successfully!");
      setTimeout(() => {
        if (book) {
          router.push(`/books/details/${book.id}`); // Redirect to books listing after success
        }
      }, 200);
    } else {
      if (errors) {
        // If there are validation errors, display them as an array
        setError(errors.map((err: { message: string }) => err.message));
      } else {
        // If there's a single error message
        setError(error || "An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h2>Create a New Book</h2>
      <form onSubmit={handleSubmit}>
        {[{ label: "Title", value: title, setter: setTitle },
          { label: "Author", value: author, setter: setAuthor },
          { label: "Published Date", value: published, setter: setPublished, type: "date" },
          { label: "ISBN", value: isbn, setter: setIsbn },
        ].map(({ label, value, setter, type = "text" }, index) => (
          <div key={index}>
            <label htmlFor={label}>{label}</label>
            <input
              type={type}
              id={label}
              name={label.toLowerCase().replace(/\s+/g, '_')} 
              value={value}
              onChange={(e) => setter(e.target.value)}
              required
            />
          </div>
        ))}
        {Array.isArray(error) ? (
          <div style={{ color: "red" }}>
            {error.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
          </div>
        ) : (
          error && <p style={{ color: "red" }}>{error}</p>
        )}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <button type="submit">Create Book</button>
      </form>
      <Link href={`/books`} style={{ color: "blue", textDecoration: "underline", marginRight: "10px" }}>
                     Go back to book list
                    </Link>
    </div>
  );
}
