import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  rococo,
  UseInkathonProvider,
  useInkathon,
} from "@scio-labs/use-inkathon";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UseInkathonProvider appName="ink!athon" defaultChain={rococo}>
      <Component {...pageProps} />
    </UseInkathonProvider>
  );
}
