import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import dynamic from "next/dynamic";
import { InkConfig } from "useink";
import { RococoContractsTestnet } from "useink/chains";
import { NotificationsProvider } from "useink/notifications";

const UseInkProvider: React.ComponentType<React.PropsWithChildren<InkConfig>> =
  dynamic(() => import("useink").then(({ UseInkProvider }) => UseInkProvider), {
    ssr: false,
  });

function App({ Component, pageProps }: AppProps) {
  return (
    <UseInkProvider
      config={{
        dappName: "OpenPayroll",
        chains: [RococoContractsTestnet],
      }}
    >
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </UseInkProvider>
  );
}

export default App;
