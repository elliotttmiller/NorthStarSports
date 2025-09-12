import React from 'react';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          My Account
        </h1>
        <p className="text-lg text-neutral-600 mb-8">
          Account management features coming soon
        </p>
        <div className="text-6xl mb-6">👤</div>
        <div className="bg-white rounded-card border border-neutral-200 p-6 max-w-md mx-auto">
          <div className="text-sm text-neutral-600 mb-2">Current Balance</div>
          <div className="text-2xl font-bold text-primary mb-4">$1,250.00</div>
          <div className="text-sm text-neutral-600">
            Account features and settings will be available in this section.
          </div>
        </div>
      </div>
    </div>
  );
}