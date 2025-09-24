import React from "react";
import Head from "next/head";

export const metadata = {
  title: "Other | NorthStar Sports",
  description: "Explore other features and information.",
};

export default function OtherPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <section className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Other</h1>
        {/* TODO: Add additional features and info here */}
      </section>
    </main>
  );
}
