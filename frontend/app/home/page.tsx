import React from "react";
import Head from "next/head";

export const metadata = {
  title: "Home | NorthStar Sports",
  description: "Welcome to NorthStar Sports. Discover games, stats, and more.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <section className="container mx-auto py-12">
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to NorthStar Sports
        </h1>
        {/* TODO: Add featured content, stats, and navigation here */}
      </section>
    </main>
  );
}
