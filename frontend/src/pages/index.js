import { useState } from 'react';
import { useWalletContext } from '../context/WalletContext';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';

export default function Home() {
  const wallet = useWalletContext();
  const [loading, setLoading] = useState(false);

  const createMemeCoin = async () => {
    setLoading(true);
    // Logic to create MemeCoin using the Solana contract.
    const connection = new Connection(clusterApiUrl("devnet"));
    const publicKey = wallet.publicKey;

    // Prepare transaction to call a smart contract for creating a meme coin
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: new PublicKey("<new_account_pubkey>"),
        lamports: 1000000,
        space: 2000,
        programId: new PublicKey("<solana_program_id>"),
      })
    );

    try {
      const signature = await wallet.sendTransaction(transaction, connection);
      console.log('Transaction signature', signature);
    } catch (error) {
      console.error("Transaction failed", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Welcome to MemeCoin Genie!</h1>
      <button onClick={createMemeCoin} disabled={loading}>
        {loading ? 'Creating Meme Coin...' : 'Create Meme Coin'}
      </button>
    </div>
  );
}
