import React from "react";
import Head from "next/head";

export const metadata = {
  title: "Games | NorthStar Sports",
  description: "Browse and interact with live and upcoming games.",
};

export default function GamesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <section className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Games</h1>
        {/* TODO: Add games listing and features here */}
      </section>
    </main>
  );
}
