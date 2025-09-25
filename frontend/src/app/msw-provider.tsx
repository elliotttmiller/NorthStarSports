"use client";

import { useEffect, useState } from 'react';

export const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_MSW_ENABLED === 'true') {
      console.log("MSW Provider: Initializing Mock Service Worker...");
      import('@/mock/browser').then(({ worker }) => {
        worker.start({
          onUnhandledRequest: 'bypass',
        }).then(() => {
          console.log("MSW Provider: Mock Service Worker started successfully.");
          setMswReady(true);
        });
      });
    } else {
      setMswReady(true);
    }
  }, []);

  return mswReady ? <>{children}</> : null;
};
