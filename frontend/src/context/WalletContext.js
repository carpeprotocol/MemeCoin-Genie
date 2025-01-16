import React, { createContext, useContext, useState, useEffect } from "react";
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import {
  useWallet,
  WalletProvider,
  ConnectionProvider,
  Network,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";

const WalletContext = createContext();

export const WalletContextProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    if (window.solana) {
      setWallet(window.solana);
    }
  }, []);

  return (
    <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>
  );
};

export const useWalletContext = () => {
  return useContext(WalletContext);
};
