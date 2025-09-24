import React from "react";

export default function Body({ children }: { children: React.ReactNode }) {
  return <body className="antialiased bg-white text-gray-900">{children}</body>;
}
