import Link from "next/link";
import { getBooks } from "../../../lib/actions/api/books/bookActions"; // Import getBooks
import { handleDelete } from "./handleDelete";

export default async function BookListingPage() {
  const books = await getBooks(); // Fetch books

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
                  <td style={{ textAlign: "center", marginTop: "40px" }}>{book.title}</td>
                  <td style={{ textAlign: "center", marginTop: "40px" }}>{book.author}</td>
                  <td style={{ textAlign: "center", marginTop: "40px" }}>{book.published ? new Date(book.published).toLocaleDateString() : "N/A"}</td>
                  <td style={{ textAlign: "center", marginTop: "40px" }}>{book.isbn}</td>
                  <td style={{ textAlign: "center", marginTop: "40px" }}>
                    <Link href={`/books/edit/${book.id}`} style={{ color: "blue", textDecoration: "underline" }}>
                      Edit
                    </Link>
                    {" | "}
                    <form action={handleDelete} method="POST" style={{ display: "inline" }}>
                      <input type="hidden" name="id" value={book.id} />
                      <button type="submit" style={{ color: "red", border: "none", background: "none", cursor: "pointer" }}>
                        Delete
                      </button>
                    </form>
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
