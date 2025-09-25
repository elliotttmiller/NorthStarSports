import React from "react";
import { NavigationProvider } from "@/context/NavigationContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NavigationProvider>
      <Component {...pageProps} />
    </NavigationProvider>
  );
}
