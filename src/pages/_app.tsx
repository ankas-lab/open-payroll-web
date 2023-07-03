import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import dynamic from 'next/dynamic';
import { InkConfig } from 'useink';
import { RococoContractsTestnet } from 'useink/chains';
import { NotificationsProvider } from 'useink/notifications';
import { DappContextProvider } from '@/context';
import 'react-toastify/dist/ReactToastify.css';
import { CreateContextProvider } from '@/context/create';

const UseInkProvider: React.ComponentType<React.PropsWithChildren<InkConfig>> = dynamic(
  () => import('useink').then(({ UseInkProvider }) => UseInkProvider),
  {
    ssr: false,
  },
);

function App({ Component, pageProps }: AppProps) {
  return (
    <UseInkProvider
      config={{
        dappName: 'OpenPayroll',
        chains: [RococoContractsTestnet],
        caller: {
          default: '5Dsykc2KUHcziwcTgZkHxyDDTotBJbGNh3BakfZ5PdDGMzfm',
        },
      }}
    >
      <NotificationsProvider>
        <DappContextProvider>
          <CreateContextProvider>
            <Component {...pageProps} />
          </CreateContextProvider>
        </DappContextProvider>
      </NotificationsProvider>
    </UseInkProvider>
  );
}

export default App;
