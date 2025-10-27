import { useState, useCallback } from "react";
import { WalletState } from "../types/walletTypes";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface WalletContextProps extends WalletState {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signMessage: (message: string) => Promise<string | null>;
  transferToken: (amount: number) => void;
  setBalances: React.Dispatch<
    React.SetStateAction<{ eth: string | null; token: number }>
  >;
}

export function useWallet(): WalletContextProps {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [eth, setEth] = useState<string | null>(null);
  const [token, setToken] = useState<number>(100);
  const [error, setError] = useState<string | null>(null);

  // ✅ Versión correcta de setBalances
  const setBalances: React.Dispatch<
    React.SetStateAction<{ eth: string | null; token: number }>
  > = useCallback(
    (value) => {
      if (typeof value === "function") {
        const newState = value({ eth, token });
        setEth(newState.eth);
        setToken(newState.token);
      } else {
        setEth(value.eth);
        setToken(value.token);
      }
    },
    [eth, token]
  );

  // 🔹 Conectar wallet
  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      setError("MetaMask no detectado");
      return;
    }

    try {
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const chain: string = await window.ethereum.request({
        method: "eth_chainId",
      });

      setAccount(accounts[0]);
      setChainId(chain);

      // Obtener balance ETH
      const balanceHex: string = await window.ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });
      const balance = parseInt(balanceHex, 16) / 1e18;
      setEth(balance.toFixed(4));
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  // 🔹 Desconectar wallet
  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setChainId(null);
    setEth(null);
    setToken(100);
    setError(null);
  }, []);

  // 🔹 Firmar mensaje
  const signMessage = useCallback(
    async (message: string) => {
      if (!account) return null;
      try {
        const signature = await window.ethereum.request({
          method: "personal_sign",
          params: [message, account],
        });
        return signature;
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    [account]
  );

  // 🔹 Transferir token de prueba
  const transferToken = useCallback((amount: number) => {
    setToken((prev) => Math.max(prev - amount, 0));
  }, []);

  return {
    account,
    chainId,
    balances: { eth, token },
    connectWallet,
    disconnectWallet,
    signMessage,
    transferToken,
    setBalances,
    error,
  };
}
