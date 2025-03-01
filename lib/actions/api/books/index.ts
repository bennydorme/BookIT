// /app/api/books/index.ts

import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';  // Import the Prisma Client

// GET: List all books
export async function GET() {
  try {
    const books = await prisma.book.findMany();
    return NextResponse.json(books);  // Send the books as JSON
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

// POST: Create a new book
export async function POST(request: Request) {
  try {
    const { title, author, published, isbn } = await request.json();
    
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        published: new Date(published),
        isbn,
      },
    });

    return NextResponse.json(newBook, { status: 201 });  // Return the created book
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
// /app/api/books/[id].ts