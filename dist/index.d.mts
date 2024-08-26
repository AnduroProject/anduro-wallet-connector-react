import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

interface WalletState {
    accountPublicKey: string;
    connectionState: string;
    address: string;
}
interface NetworkState {
    chainId: any;
    networkType: string;
}
interface connectParams {
    chainId: number;
}
interface SignParams {
    message?: string;
}
interface createTransactionParams {
    transactionType?: string;
    amount?: number;
    receiverAddress?: string | undefined;
    feeRate?: number | undefined;
}
interface PropertiesType {
    type: string;
    value: string;
}
interface CreateassetParams {
    name?: string;
    symbol?: string;
    imageUrl?: string;
    supply?: number;
    properties?: PropertiesType[];
    assetType?: number;
    transactionType?: string;
    receiverAddress?: string | undefined;
    assetId?: number | undefined;
    precision?: number | undefined;
}
interface TransferAssetParams {
    assetId?: number;
    receiverAddress?: string;
    supply?: number;
}
interface SignTransactionParams {
    hex: string;
    transactionType: string;
}
type UseConnectorContextContextType = {
    networkState: NetworkState;
    walletState: WalletState;
    connect: (params: connectParams) => object;
    networkInfo: () => object;
    sign: (params: SignParams) => object;
    transferasset: (params: TransferAssetParams) => object;
    createasset: (params: CreateassetParams) => object;
    send: (params: createTransactionParams) => object;
    disconnect: () => object;
    signTransaction: (params: SignTransactionParams) => object;
    sendTransaction: (params: SignTransactionParams) => object;
    signAndSendTransaction: (params: SignTransactionParams) => object;
    signAlysTransaction: (params: SignTransactionParams) => object;
};
declare const useConnector: React.Context<UseConnectorContextContextType | null>;
declare const UseConnectorProvider: (props: any) => react_jsx_runtime.JSX.Element;

export { UseConnectorProvider, useConnector };
