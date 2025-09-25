import "../globals.css";
import { BetSlipProvider } from "@/context/BetSlipContext";
import { UserProvider } from "@/context/UserContext";
import { BetHistoryProvider } from "@/context/BetHistoryContext";
import { BetsProvider } from "@/context/BetsContext";
import { NavigationProvider } from "@/context/NavigationContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NavigationProvider>
      <BetSlipProvider>
        <UserProvider>
          <BetHistoryProvider>
            <BetsProvider>
              <Component {...pageProps} />
            </BetsProvider>
          </BetHistoryProvider>
        </UserProvider>
      </BetSlipProvider>
    </NavigationProvider>
  );
}