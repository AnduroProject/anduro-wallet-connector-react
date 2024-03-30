import React from 'react';

type Props = {
    walletUrl: string;
};
interface connectParams {
    chainId: number;
    onComplete: any;
}
interface createTransactionParams {
    transactionType: string;
    amount: number;
    receiverAddress?: string | undefined;
    feeRate?: number | undefined;
    onComplete: any;
}
interface NetworkInfo {
    chainId: any;
    networkType: string;
}
interface PropertiesType {
    type: string;
    value: string;
}
interface CreateassetParams {
    name: string;
    symbol: string;
    imageUrl: string;
    supply: number;
    properties: PropertiesType[];
    assetType: number;
    transactionType: string;
    receiverAddress: string;
    onComplete: any;
    assetId?: number;
}
interface TransferAssetParams {
    assetId: number;
    receiverAddress: string;
    supply: number;
    onComplete: any;
}
declare const useConnector: (props: Props) => {
    connect: (params: connectParams) => void;
    getNetworkInformation: () => NetworkInfo;
    send: (params: createTransactionParams) => void;
    createasset: (params: CreateassetParams) => void;
    transferasset: (params: TransferAssetParams) => void;
    disconnect: () => void;
};

interface WalletInfo {
    accountPublicKey: string;
    connectionState: string;
}
declare const useWallet: () => {
    setWalletInfo: React.Dispatch<React.SetStateAction<WalletInfo>>;
    getWalletInformation: () => WalletInfo;
};

export { useConnector, useWallet };
