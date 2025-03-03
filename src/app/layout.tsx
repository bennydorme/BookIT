import React from "react";
import Navbar from "./navbar"; // Adjust the path if needed

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Add the Navbar here */}
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
