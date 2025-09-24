import React from "react";
import Head from "next/head";

export const metadata = {
  title: "Account | NorthStar Sports",
  description: "Manage your account, profile, and settings.",
};

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <section className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-4">Account</h1>
        {/* TODO: Add account management features here */}
      </section>
    </main>
  );
}
