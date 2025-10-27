import React, { createContext, ReactNode, useContext } from "react";
import { useWallet } from "../hooks/useWallet";
import { WalletState } from "../types/walletTypes";

interface WalletContextProps extends WalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  setBalances: React.Dispatch<
    React.SetStateAction<{ eth: string | null; token: number }>
  >;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const wallet = useWallet();

  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  );
};

// Hook para usar el context fácilmente
export const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWalletContext debe usarse dentro de WalletProvider");
  return context;
};
