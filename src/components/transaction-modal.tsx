'use client';

import { useState, useEffect } from 'react';
import { X, Zap, AlertTriangle, CheckCircle, Wallet } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
import { createVoteTransaction, createInvestmentTransaction, requestAirdrop, getBalance } from '@/lib/solana-transactions';
import { toast } from 'react-hot-toast';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (signature?: string) => void;
  type: 'like' | 'dislike' | 'invest';
  suggestionTitle: string;
  suggestionId: string;
}

export function TransactionModal({ isOpen, onClose, onConfirm, type, suggestionTitle, suggestionId }: TransactionModalProps) {
  const [step, setStep] = useState<'review' | 'signing' | 'success'>('review');
  const [progress, setProgress] = useState(0);
  const [transactionSignature, setTransactionSignature] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [isRequestingAirdrop, setIsRequestingAirdrop] = useState(false);
  const wallet = useWallet();

  // Check balance when modal opens
  useEffect(() => {
    if (isOpen && wallet.publicKey) {
      getBalance(wallet.publicKey).then(setBalance);
    }
  }, [isOpen, wallet.publicKey]);

  const handleSign = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    setStep('signing');
    setProgress(0);
    setError('');

    try {
      let signature: string;

      if (type === 'invest') {
        signature = await createInvestmentTransaction({
          wallet,
          suggestionId
        });
      } else {
        signature = await createVoteTransaction({
          wallet,
          suggestionId,
          voteType: type
        });
      }

      setTransactionSignature(signature);
      setProgress(100);
      setStep('success');
    } catch (error: any) {
      console.error('Transaction failed:', error);
      setError(error.message || 'Transaction failed');
      setStep('review');
      setProgress(0);
    }
  };

  const handleComplete = () => {
    onConfirm(transactionSignature);
    onClose();
    setStep('review');
    setProgress(0);
    setTransactionSignature('');
    setError('');
  };

  const handleAirdrop = async () => {
    if (!wallet.publicKey) return;

    setIsRequestingAirdrop(true);
    try {
      toast.loading('Requesting SOL airdrop...', { id: 'modal-airdrop' });
      await requestAirdrop(wallet.publicKey);

      // Refresh balance
      const newBalance = await getBalance(wallet.publicKey);
      setBalance(newBalance);

      toast.success('🎉 Airdrop successful! You can now sign transactions.', { id: 'modal-airdrop' });
    } catch (error: any) {
      toast.error(error.message || 'Airdrop failed', { id: 'modal-airdrop' });
    } finally {
      setIsRequestingAirdrop(false);
    }
  };

  if (!isOpen) return null;

  const getTransactionDetails = () => {
    switch (type) {
      case 'like':
        return {
          action: 'VOTE LIKE',
          description: 'Sign memo transaction to record your vote on Solana blockchain',
          fee: '~0.000005 SOL',
          icon: '👍',
          color: 'bg-green-400'
        };
      case 'dislike':
        return {
          action: 'VOTE DISLIKE',
          description: 'Sign memo transaction to record your vote on Solana blockchain',
          fee: '~0.000005 SOL',
          icon: '👎',
          color: 'bg-red-400'
        };
      case 'invest':
        return {
          action: 'ADD TO WATCHLIST',
          description: 'Sign memo transaction to record investment interest on blockchain',
          fee: '~0.000005 SOL',
          icon: '📊',
          color: 'bg-yellow-400'
        };
    }
  };

  const details = getTransactionDetails();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
        {/* Header */}
        <div className={`${details.color} border-b-4 border-black p-4 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{details.icon}</span>
            <h3 className="font-black text-lg text-black">{details.action}</h3>
          </div>
          <button
            onClick={onClose}
            className="bg-black text-white p-1 border-2 border-black hover:bg-gray-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          {step === 'review' && (
            <>
              <div className="mb-6">
                <h4 className="font-black text-lg mb-2">TRANSACTION DETAILS</h4>
                <div className="bg-gray-100 border-2 border-black p-4 mb-4">
                  <p className="font-bold text-sm text-gray-700 mb-2">Strategy:</p>
                  <p className="font-black text-black">{suggestionTitle}</p>
                </div>
                <p className="text-sm font-bold text-gray-700 mb-4">{details.description}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-bold">Network Fee:</span>
                    <span className="font-black">{details.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Transaction Type:</span>
                    <span className="font-black">MEMO (REAL)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Network:</span>
                    <span className="font-black">SOLANA DEVNET</span>
                  </div>
                </div>
              </div>

              {!wallet.connected ? (
                <div className="bg-red-100 border-2 border-black p-3 mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Wallet className="h-4 w-4 text-red-600" />
                    <span className="font-black text-sm">WALLET NOT CONNECTED</span>
                  </div>
                  <p className="text-xs font-bold text-red-800">
                    Please connect your Solana wallet to sign this transaction.
                  </p>
                </div>
              ) : balance < 0.01 ? (
                <div className="bg-orange-100 border-2 border-black p-3 mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <span className="font-black text-sm">LOW BALANCE</span>
                  </div>
                  <p className="text-xs font-bold text-orange-800 mb-3">
                    Balance: {balance.toFixed(4)} SOL. You need SOL to pay transaction fees.
                  </p>
                  <button
                    onClick={handleAirdrop}
                    disabled={isRequestingAirdrop}
                    className="bg-blue-400 hover:bg-blue-300 disabled:bg-gray-400 text-black font-bold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0"
                  >
                    {isRequestingAirdrop ? 'REQUESTING...' : 'GET FREE SOL'}
                  </button>
                </div>
              ) : (
                <div className="bg-blue-100 border-2 border-black p-3 mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <Wallet className="h-4 w-4 text-blue-600" />
                    <span className="font-black text-sm">REAL TRANSACTION</span>
                  </div>
                  <p className="text-xs font-bold text-blue-800">
                    Balance: {balance.toFixed(4)} SOL. This will create a real memo transaction on Solana blockchain.
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-100 border-2 border-black p-3 mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <span className="font-black text-sm">ERROR</span>
                  </div>
                  <p className="text-xs font-bold text-red-800">{error}</p>
                </div>
              )}

              <button
                onClick={handleSign}
                className="w-full bg-black text-white font-black py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <Zap className="h-4 w-4 mr-2 inline" />
                SIGN TRANSACTION
              </button>
            </>
          )}

          {step === 'signing' && (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black">
                  <Zap className="h-8 w-8 animate-pulse" />
                </div>
                <h4 className="font-black text-lg mb-2">SIGNING TRANSACTION</h4>
                <p className="text-sm font-bold text-gray-600">
                  {progress === 0 ? 'Please approve the transaction in your wallet...' :
                   progress < 50 ? 'Broadcasting transaction to Solana network...' :
                   progress < 100 ? 'Waiting for confirmation...' :
                   'Transaction confirmed!'}
                </p>
              </div>

              <div className="bg-gray-100 border-2 border-black p-4 mb-4">
                <div className="w-full bg-gray-300 border-2 border-black h-4">
                  <div
                    className="bg-yellow-400 h-full transition-all duration-300 border-r-2 border-black"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="font-black text-sm mt-2">
                  {progress === 100 ? 'CONFIRMED!' : 'PROCESSING...'}
                </p>
              </div>

              {wallet.connected && (
                <div className="bg-blue-100 border-2 border-black p-3">
                  <p className="text-xs font-bold text-blue-800">
                    Using: {wallet.wallet?.adapter.name || 'Connected Wallet'}
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 'success' && (
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-400 text-black rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-black">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h4 className="font-black text-lg mb-2">TRANSACTION SUCCESS!</h4>
                <p className="text-sm font-bold text-gray-600">Your vote has been recorded on Solana blockchain.</p>
              </div>

              <div className="bg-green-100 border-2 border-black p-4 mb-6">
                <p className="font-black text-xs text-green-800 mb-2">
                  Transaction Signature:
                </p>
                <p className="font-mono text-xs text-green-700 break-all">
                  {transactionSignature}
                </p>
                <a
                  href={`https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 bg-black text-white px-3 py-1 text-xs font-bold border border-black hover:bg-gray-800 transition-colors"
                >
                  VIEW ON EXPLORER
                </a>
              </div>

              <button
                onClick={handleComplete}
                className="w-full bg-green-400 text-black font-black py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                CONTINUE
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}