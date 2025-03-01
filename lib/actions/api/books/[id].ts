// /app/api/books/[id].ts

import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';  // Import the Prisma Client

// GET: Get a single book by ID
export async function GET({ params }: { params: { id: string } }) {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 });
  }
}

// PUT: Update a book by ID
export async function PUT({ params, request }: { params: { id: string }; request: Request }) {
  try {
    const { title, author, published, isbn } = await request.json();

    const updatedBook = await prisma.book.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        author,
        published: new Date(published),
        isbn,
      },
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

// DELETE: Delete a book by ID
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const deletedBook = await prisma.book.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
}
