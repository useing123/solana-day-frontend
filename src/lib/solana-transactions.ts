import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  SystemProgram,
  clusterApiUrl,
  LAMPORTS_PER_SOL
} from '@solana/web3.js';
import { WalletContextState } from '@solana/wallet-adapter-react';

// Use devnet for development
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export interface VoteTransactionParams {
  wallet: WalletContextState;
  suggestionId: string;
  voteType: 'like' | 'dislike';
}

export const createVoteTransaction = async ({
  wallet,
  suggestionId,
  voteType
}: VoteTransactionParams): Promise<string> => {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error('Wallet not connected');
  }

  try {
    // Create a simple memo transaction with zero transfer
    // This creates an on-chain record of the vote without any cost
    const transaction = new Transaction();

    // Add a memo instruction that records the vote
    const memoInstruction = new TransactionInstruction({
      keys: [{ pubkey: wallet.publicKey, isSigner: true, isWritable: false }],
      data: Buffer.from(`VOTE:${voteType}:${suggestionId}`, 'utf-8'),
      programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr') // Memo program
    });

    transaction.add(memoInstruction);

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    // Sign the transaction
    const signedTransaction = await wallet.signTransaction(transaction);

    // Send the transaction
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());

    // Wait for confirmation
    await connection.confirmTransaction(signature, 'confirmed');

    return signature;
  } catch (error) {
    console.error('Transaction failed:', error);
    throw error;
  }
};

export const createInvestmentTransaction = async ({
  wallet,
  suggestionId
}: {
  wallet: WalletContextState;
  suggestionId: string;
}): Promise<string> => {
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error('Wallet not connected');
  }

  try {
    const transaction = new Transaction();

    // Add a memo instruction for investment intent
    const memoInstruction = new TransactionInstruction({
      keys: [{ pubkey: wallet.publicKey, isSigner: true, isWritable: false }],
      data: Buffer.from(`INVEST:${suggestionId}`, 'utf-8'),
      programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')
    });

    transaction.add(memoInstruction);

    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    const signedTransaction = await wallet.signTransaction(transaction);
    const signature = await connection.sendRawTransaction(signedTransaction.serialize());

    await connection.confirmTransaction(signature, 'confirmed');

    return signature;
  } catch (error) {
    console.error('Investment transaction failed:', error);
    throw error;
  }
};

export const requestAirdrop = async (publicKey: PublicKey): Promise<string> => {
  try {
    // Request 1 SOL airdrop (enough for many transactions)
    const airdropSignature = await connection.requestAirdrop(
      publicKey,
      1 * LAMPORTS_PER_SOL
    );

    // Wait for confirmation
    await connection.confirmTransaction(airdropSignature, 'confirmed');

    return airdropSignature;
  } catch (error: any) {
    console.error('Airdrop failed:', error);

    // Handle common airdrop errors
    if (error.message?.includes('airdrop request limit exceeded')) {
      throw new Error('Airdrop limit exceeded. Please try again later or use a different wallet.');
    } else if (error.message?.includes('insufficient funds')) {
      throw new Error('Airdrop service temporarily unavailable. Try again in a few minutes.');
    }

    throw new Error('Airdrop failed. Please try again.');
  }
};

export const getBalance = async (publicKey: PublicKey): Promise<number> => {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Failed to get balance:', error);
    return 0;
  }
};