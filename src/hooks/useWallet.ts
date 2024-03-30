import React, { useState } from 'react';

interface WalletInfo {
  accountPublicKey: string; // wallet account public key
  connectionState: string; // connection state
};
const walletInformation: WalletInfo = {
    accountPublicKey: "",
    connectionState: "disconnected",
}
export const useWallet = () => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo>(walletInformation);
  React.useEffect(() => {
    if (walletInfo.accountPublicKey) {
        walletInformation.accountPublicKey = walletInfo.accountPublicKey;
        walletInformation.connectionState = walletInfo.connectionState;
    }
  }, [walletInfo])
  const getWalletInformation = () => {
    return walletInformation;
  }
  return {setWalletInfo, getWalletInformation}
}