import * as react_jsx_runtime from 'react/jsx-runtime';
import React from 'react';

type UseConnectorContextContextType = {
    getNetworkInformation: any;
    getWalletInformation: any;
    connect: any;
    disconnect: any;
    send: any;
    createasset: any;
    transferasset: any;
    isConnected: boolean;
};
declare const useConnector: React.Context<UseConnectorContextContextType | null>;
declare const UseConnectorProvider: (props: any) => react_jsx_runtime.JSX.Element;

export { UseConnectorProvider, useConnector };
