// /app/books/layout.tsx
import React from 'react';

export default function BooksLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>{children}</section>
  );
}
