import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface WalletState {
    accountPublicKey: string;
    connectionState: string;
}
interface NetworkState {
    chainId: any;
    networkType: string;
}
interface connectParams {
    chainId: number;
    walletURL: string;
}
interface createTransactionParams {
    transactionType: string;
    amount: number;
    receiverAddress?: string | undefined;
    feeRate?: number | undefined;
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
    assetId?: number;
}
interface TransferAssetParams {
    assetId: number;
    receiverAddress: string;
    supply: number;
}
type UseConnectorContextContextType = {
    networkState: NetworkState;
    walletState: WalletState;
    isConnected: boolean;
    connect: (params: connectParams) => any;
    transferasset: (params: TransferAssetParams) => any;
    createasset: (params: CreateassetParams) => any;
    send: (params: createTransactionParams) => any;
    disconnect: () => any;
};
declare const useConnector: React.Context<UseConnectorContextContextType | null>;
declare const UseConnectorProvider: (props: any) => react_jsx_runtime.JSX.Element;

export { UseConnectorProvider, useConnector };
