import React from "react";
import Head from "next/head";

export const metadata = {
  title: "Live | NorthStar Sports",
  description: "See live games and real-time updates.",
};

export default function LivePage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <section className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Live Games</h1>
        {/* TODO: Add live games and updates here */}
      </section>
    </main>
  );
}
