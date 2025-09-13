'use client';

import React, { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { TrustWalletAdapter } from '@solana/wallet-adapter-trust';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import wallet adapter CSS - using dynamic import to avoid SSR issues
if (typeof window !== 'undefined') {
  require('@solana/wallet-adapter-react-ui/styles.css');
}

interface WalletContextProviderProps {
  children: ReactNode;
}

export const WalletContextProvider: FC<WalletContextProviderProps> = ({ children }) => {
  // Use devnet for development (you can change to mainnet-beta for production)
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Initialize wallet adapters with error handling
  const wallets = useMemo(
    () => {
      console.log('Initializing wallet adapters...');
      try {
        const adapters = [
          new PhantomWalletAdapter(),
          new SolflareWalletAdapter(),
          new TrustWalletAdapter(),
        ];
        console.log('Wallet adapters initialized successfully:', adapters.length);
        return adapters;
      } catch (error) {
        console.error('Error initializing wallet adapters:', error);
        return [];
      }
    },
    []
  );

  const onError = (error: any) => {
    console.error('Wallet connection error:', error);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect onError={onError}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};