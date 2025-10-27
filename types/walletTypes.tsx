export interface WalletState {
  account: string | null;
  chainId: string | null;
  balances: {
    eth: string | null;
    token: number;
  };
  error: string | null;
}