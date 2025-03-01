import React from "react";
import Link from "next/link";
import { PrismaClient, Book } from "@prisma/client";
import prisma from "../../../lib/prisma";

export default async function BookListingPage() {
  let books: Book[] = [];

  try {
    books = await prisma.book.findMany(); // Fetch all books from the database
  } catch (error) {
    console.error("Error fetching books:", error);
  }

  return (
    <div>
      <h2>Books</h2>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <table style={{ width: "80%" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published</th>
              <th>ISBN</th>
              <th>Actions</th> {/* Add actions column for edit link */}
            </tr>
          </thead>
          {books.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={5}>No books available.</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{new Date(book.published).toLocaleDateString()}</td>
                  <td>{book.isbn}</td>
                  <td>
                    <Link href={`/books/edit/${book.id}`} style={{ color: "blue", textDecoration: "underline" }}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        <Link href="/books/create" style={{ marginLeft: "20px" }}>
          Create New Book
        </Link>
      </div>
    </div>
  );
}
