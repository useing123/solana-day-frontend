'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { requestAirdrop, getBalance } from '@/lib/solana-transactions';
import { toast } from 'react-hot-toast';

export function WalletButton() {
  const { wallet, connected, publicKey, disconnect } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const [isRequestingAirdrop, setIsRequestingAirdrop] = useState(false);

  // Fetch balance when wallet connects
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (connected && publicKey) {
      const fetchBalance = async () => {
        const bal = await getBalance(publicKey);
        setBalance(bal);
      };

      fetchBalance();
      // Update balance every 10 seconds
      interval = setInterval(fetchBalance, 10000);
    } else {
      setBalance(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [connected, publicKey]);

  const handleAirdrop = async () => {
    if (!publicKey) return;

    setIsRequestingAirdrop(true);
    try {
      toast.loading('Requesting 1 SOL airdrop...', { id: 'airdrop' });
      const signature = await requestAirdrop(publicKey);

      toast.success(`🎉 Airdrop successful! Signature: ${signature.slice(0, 8)}...`, { id: 'airdrop' });

      // Refresh balance after airdrop
      setTimeout(async () => {
        const newBalance = await getBalance(publicKey);
        setBalance(newBalance);
      }, 2000);

    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, { id: 'airdrop' });
      } else {
        toast.error('Airdrop failed', { id: 'airdrop' });
      }
    } finally {
      setIsRequestingAirdrop(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {connected && publicKey ? (
        <div className="flex items-center gap-2">
          <div className="bg-green-400 border-2 border-black px-2 py-1 font-bold text-xs">
            {wallet?.adapter.name || 'Wallet'}
          </div>
          <div className="bg-white border-2 border-black px-2 py-1 font-bold text-xs text-gray-700">
            {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
          </div>
          <div className="bg-yellow-400 border-2 border-black px-2 py-1 font-bold text-xs text-black">
            {balance.toFixed(3)} SOL
          </div>
          {balance < 0.01 && (
            <button
              onClick={handleAirdrop}
              disabled={isRequestingAirdrop}
              className="bg-blue-400 hover:bg-blue-300 disabled:bg-gray-400 border-2 border-black px-2 py-1 font-bold text-xs text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
            >
              {isRequestingAirdrop ? 'AIRDROP...' : 'GET SOL'}
            </button>
          )}
          <button
            onClick={disconnect}
            className="bg-red-400 hover:bg-red-300 border-2 border-black px-2 py-1 font-bold text-xs text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            DISCONNECT
          </button>
        </div>
      ) : (
        <WalletMultiButton className="!bg-yellow-400 hover:!bg-yellow-300 !text-black !font-bold !border-2 !border-black !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:!shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] !transition-all !rounded-none" />
      )}
    </div>
  );
}