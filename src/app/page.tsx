"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4"> Welcome to the Book Manager API</h1>
      <p className="text-lg text-gray-300 max-w-2xl text-center">
        Manage your book collection with ease! This API allows you to **add, edit, view, and delete** books effortlessly.  
        Built with **Next.js, Prisma, and TypeScript**, it ensures smooth performance and scalability.
      </p>

    </main>
  );
}
