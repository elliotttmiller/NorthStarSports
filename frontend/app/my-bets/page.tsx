import React from "react";
import Head from "next/head";

export const metadata = {
  title: "My Bets | NorthStar Sports",
  description: "Track your bets and performance.",
};

export default function MyBetsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <section className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">My Bets</h1>
        {/* TODO: Add bet tracking and analytics here */}
      </section>
    </main>
  );
}
