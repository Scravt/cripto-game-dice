import { de } from "date-fns/locale";
import { useState, useEffect, useCallback } from "react";

interface WalletState {
    account: string | null;
    chainId: string | null;
    ethBalance: string | null;
    tokenBalance: number; // token de prueba
}
declare global {
    interface Window {
        ethereum?: any;
    }
}

export function useWallet() {
    const [error, setError] = useState<string | null>(null);

    const [wallet, setWallet] = useState<WalletState>({
        account: null,
        chainId: null,
        ethBalance: null,
        tokenBalance: 100, // inicial para token de prueba
    });

    // Conectar wallet
    const connectWallet = useCallback(async () => {
        if (!window.ethereum) {
            alert("MetaMask no detectado");
            return;
        }

        try {
            const accounts: string[] = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const chainId: string = await window.ethereum.request({
                method: "eth_chainId",
            });

            setWallet((prev) => ({
                ...prev,
                account: accounts[0],
                chainId,
            }));

            // Obtener balance ETH
            const balanceHex: string = await window.ethereum.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
            });
            const balance = parseInt(balanceHex, 16) / 1e18;
            setWallet((prev) => ({ ...prev, ethBalance: balance.toFixed(4) }));
        } catch (err: unknown) {
            console.error(error);
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(String(err));
            }
        }
    }, []);

    // Desconectar wallet (solo limpia estado)
    const disconnectWallet = useCallback(() => {
        setWallet({
            account: null,
            chainId: null,
            ethBalance: null,
            tokenBalance: 100,
        });
    }, []);

    // Firmar mensaje para demostración
    const signMessage = useCallback(async (message: string) => {
        if (!wallet.account) return null;
        try {
            const signature = await window.ethereum.request({
                method: "personal_sign",
                params: [message, wallet.account],
            });
            return signature;
        } catch (err) {
            console.error(err);
            return null;
        }
    }, [wallet.account]);

    // Simular transferencia de token de prueba
    const transferToken = useCallback((amount: number) => {
        setWallet((prev) => ({
            ...prev,
            tokenBalance: prev.tokenBalance - amount,
        }));
    }, []);

    // Puedes agregar más funciones: apuestas, recibir tokens, etc.

    return {
        wallet,
        connectWallet,
        disconnectWallet,
        signMessage,
        transferToken,
    };
}
