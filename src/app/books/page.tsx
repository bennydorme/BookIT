import Link from "next/link";
import prisma from "../../../lib/prisma";

// Fetch books from the database (server-side function)
async function getBooks() {
  try {
    return await prisma.book.findMany();
  } catch (error) {
    console.error("Error fetching books:", error);
    return []; // Return an empty array if there's an error
  }
}

export default async function BookListingPage() {
  const books = await getBooks();

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
              <th>Actions</th>
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
                  <td>{book.published ? new Date(book.published).toLocaleDateString() : "N/A"}</td>
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
