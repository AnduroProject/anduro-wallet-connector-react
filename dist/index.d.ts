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
type UseConnectorContextContextType = {
    networkState: NetworkState;
    walletState: WalletState;
    connect: any;
    disconnect: any;
    send: any;
    createasset: any;
    transferasset: any;
};
declare const useConnector: React.Context<UseConnectorContextContextType | null>;
declare const UseConnectorProvider: (props: any) => react_jsx_runtime.JSX.Element;

export { UseConnectorProvider, useConnector };
