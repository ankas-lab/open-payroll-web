import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { development, UseInkathonProvider } from "@scio-labs/use-inkathon";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UseInkathonProvider appName="ink!athon" defaultChain={development}>
      <Component {...pageProps} />
    </UseInkathonProvider>
  );
}
