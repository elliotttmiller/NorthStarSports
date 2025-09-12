import React from 'react';

export default function SportsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          A-Z Sports
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          Browse all available sports and leagues
        </p>
        <div className="text-6xl mb-6">⚽</div>
        <div className="bg-white rounded-card border border-neutral-200 p-6 max-w-md mx-auto">
          <div className="text-neutral-600">
            Sports listing and league selection features will be available in this section.
          </div>
        </div>
      </div>
    </div>
  );
}