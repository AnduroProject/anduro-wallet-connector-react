/*
Project : Anduro Wallet Connector
FileName : useConnector.tsx
Author : MarathonDH Developers
File Created : 04/03/2024
CopyRights : Marathon DH
Purpose : This is the file that is used to handle connect , disconnect and manage anduro wallet.
*/

import React, { useState, useEffect } from "react";

interface WalletState {
    accountPublicKey: string;
    connectionState: string;
};
interface NetworkState {
    chainId: any;
    networkType: string;
};

interface connectParams {
  chainId: number;
};
interface createTransactionParams {
    transactionType: string;
    amount: number;
    receiverAddress?: string | undefined;
    feeRate?: number | undefined;
};
interface PropertiesType {
    type: string;
    value: string;
};
interface CreateassetParams {
    name: string;
    symbol: string;
    imageUrl: string;
    supply: number;
    properties: PropertiesType[];
    assetType: number;
    transactionType: string;
    receiverAddress?: string | undefined;
    assetId?: number | undefined;
};
interface TransferAssetParams {
    assetId: number;
    receiverAddress: string;
    supply: number;
};
enum requestTypes {
  connect = 'connect',
  disconnected = 'disconnect',
  connectionResponse = 'connection-response',
  accountNotCreated = 'account-not-created',
  walletLoaded = 'wallet-loaded',
  networkinfo = 'networkinfo',
  send = 'send',
  createAsset = 'create-asset',
  transferAsset = 'transfer-asset',
  networkinfoResponse = 'networkinfo-response',
  sendResponse = 'send-response',
  createAssetResponse = 'create-asset-response',
  disconnectResponse = 'disconnect-response',
  bitcoin = 'bitcoin',
  sidechain = 'sidechain',
  normal = 'normal',
  pegin = 'pegin',
  pegout = 'pegout'
};

type UseConnectorContextContextType = {
  networkState: NetworkState;
  walletState: WalletState;
  connect: (params: connectParams) => any;
  transferasset: (params: TransferAssetParams) => any;
  createasset: (params: CreateassetParams) => any;
  send: (params: createTransactionParams) => any;
  disconnect: () => any;
}
export const useConnector = React.createContext<UseConnectorContextContextType | null>(
    null,
)
let resolvePromise: any = null;
export const UseConnectorProvider = (props: any) => {
    const [childWindow, setChildWindow] = useState<any>(null);
    const [requestType, setRequestType] = useState("");
    const [transactionData, setTransactionData] = useState<createTransactionParams>({
      transactionType: "",
      amount: 0,
      receiverAddress: "",
      feeRate: 1,
    });
    const [requestData, setRequestData] = React.useState<any>(null);
    const [createAssetData, setCreateAssetData] = React.useState<CreateassetParams>({
      name: "",
      symbol: "",
      imageUrl: "",
      supply: 0,
      properties: [{type: "", value: "",}],
      assetType: 0,
      transactionType: "",
      receiverAddress: "",
    });
    const [transferAssetData, setTransferAssetData] = React.useState<TransferAssetParams>({
      assetId: 0,
      receiverAddress: "",
      supply: 0,
    });
    const [networkState, setNetworkState] = React.useState<NetworkState>({chainId: null, networkType: ""})
    const [walletState, setWalletState] = React.useState<WalletState>({accountPublicKey: "", connectionState: "disconnected"})
    const [walletURL, setWalletURL] = useState(localStorage.getItem("walletURL") || props.walletURL);
    const windowFeatures = "left=1000,top=100,width=370,height=550,fullscreen=yes,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no, titlebar=no";

    useEffect(() => {
      if (networkState.chainId === null && requestType !== "disconnect") {
        const url = `${walletURL}?requestType=networkinfo`;
        let targetWindow: any = window.open(url,"_blank",windowFeatures);
        setChildWindow(targetWindow)
        setRequestType("networkinfo")
      }
    }, [networkState]);
    
    useEffect(() => {
      if (childWindow != null) {
        window.addEventListener('message', handleMessage);
        return () => {
          window.removeEventListener('message', handleMessage);
        };
      }
    }, [childWindow]);
    useEffect(() => {
      if (
        (localStorage.getItem("walletURL") && localStorage.getItem("walletURL") !== props.walletURL) ||
        (localStorage.getItem("walletURL") === null && props.walletURL)
      ) {
        localStorage.setItem("walletURL", props.walletURL)
      }
    }, []);

    /**
     * The following function used for listening messages from anduro wallet extension
    */
    const handleMessage = (event: any) => {
      if (event.data.type === requestTypes.connectionResponse) {
        if (event.data.status) {
          childWindow.close();
          updateNetworkInformation(event.data.result)
          updateWalletInformation("connected", event.data.result.accountPublicKey)          
          resolvePromise({status: true, result: event.data})
        } else {
          resolvePromise({status: false, result: event.data})
        }
      } else if (event.data.type === requestTypes.accountNotCreated) {
        childWindow.close()
        resolvePromise({status: false, result: event.data})
      } else if (event.data.type === requestTypes.walletLoaded) {
        if (event.data.status) {
          if (requestType === requestTypes.connect || requestType === requestTypes.disconnected) {
            sendMessageToChildWindow({requestType, siteurl: window.location.origin, chainId: requestData ? requestData.chainId : 0});
          } else if (requestType === requestTypes.networkinfo) {
            sendMessageToChildWindow({requestType: requestType, siteurl: window.location.origin})
          } else if (requestType === requestTypes.send) {
            sendMessageToChildWindow({requestType: requestType, transactionType: transactionData.transactionType, amount: transactionData.amount, receiverAddress: transactionData.receiverAddress, feerate: transactionData.feeRate, chainId: networkState.chainId })
          } else if (requestType === requestTypes.createAsset) {
            const formValues = {
              headline: createAssetData.name,
              imageUrl: createAssetData.imageUrl,
              supply: createAssetData.supply,
              imagebase64Data: {data: "", type: ""},
              symbol: createAssetData.symbol,
            }
            sendMessageToChildWindow({requestType: requestType, transactionType: createAssetData.transactionType, formValues, assetType: createAssetData.assetType, properties: createAssetData.properties, chainId: networkState.chainId, supply: createAssetData.supply, receiverAddress: createAssetData.receiverAddress, assetId: createAssetData.assetId })
          } else if (requestType === requestTypes.transferAsset) {
            sendMessageToChildWindow({requestType: requestType, chainId: networkState.chainId, supply: transferAssetData.supply, receiverAddress: transferAssetData.receiverAddress, assetId: transferAssetData.assetId })
          }
        }
      } else if (event.data.type === requestTypes.networkinfoResponse) {
        childWindow.close()
        if (event.data.status) {
            updateNetworkInformation(event.data.result)
            updateWalletInformation("conneted", event.data.result.accountPublicKey)
        }
      } else if (event.data.type === requestTypes.sendResponse || event.data.type === requestTypes.createAssetResponse) {
        childWindow.close()
        resolvePromise({status: true, result: event.data})
      } else if (event.data.type === requestTypes.disconnectResponse) {
        childWindow.close()
        updateNetworkInformation({chainId: null, networkType: "",})
        updateWalletInformation("disconnected", "")
      }
    }

    /**
     * The following function used for sending messages to anduro wallet extension
    */
    const sendMessageToChildWindow = (data: any) => {
      childWindow.postMessage(data, "*");
    }

    /**
     * The following function used for setting network information in library
    */
    const updateNetworkInformation = (params: any) => {
        setNetworkState({
            chainId: params.chainId,
            networkType: params.networkType,
        });
    }

    /**
     * The following function used for setting wallet account public key , connection state information in library
    */
    const updateWalletInformation = (connectionState: string, accountPublicKey: string) => {
      setWalletState({
        accountPublicKey: accountPublicKey,
        connectionState: connectionState,
      })
    }

    /**
     * The following function used for connecting anduro wallet extension
     * 
     * @param chainId Connection request chain ID
     * 
    */
    const connect = async (params: connectParams) => {
      return new Promise((resolve, reject) => {
        const url = `${walletURL}?requestType=connect`;
        let childWindow = window.open(url,"_blank",windowFeatures);
        setWalletURL(walletURL)
        setRequestType("connect")
        setChildWindow(childWindow)
        setRequestData({
          chainId: params.chainId,
        })
        updateWalletInformation("connecting", "")
        resolvePromise = resolve;
      })
    }
  
    /**
     * The following function used for disconnecting anduro wallet extension
    */
    const disconnect = () => {
      return new Promise((resolve, reject) => {
        const url = `${walletURL}?requestType=disconnect`;
        let childWindow = window.open(url,"_blank",windowFeatures);
        setRequestType("disconnect")
        setChildWindow(childWindow)
        updateWalletInformation("disconnecting", "")
        resolvePromise = resolve;
      })
    }

    /**
     * The following function used for send BTC / CBTC to receiver and 
     * convert BTC to CBTC / CBTC to BTC in anduro wallet
     * 
     * @param transactionType 1. normal - Send BTC / CBTC OR CBTC / BTC, 2. pegin - Convert BTC to CBTC, 3. pegout - Convert CBTC to BTC
     * @param amount transaction amount
     * @param receiverAddress Receiver address ( coordinate address / bitcoin address )
     * @param feeRate
     * 
    */
    const send = (params: createTransactionParams) => {
      return new Promise((resolve, reject) => {
        if (checkWalletConnection(resolve, "")) {
          const validateTransactionTypeResult = validateSendTransactionType(params.transactionType)
          if (!validateTransactionTypeResult) {
            resolve({
              status: false,
              error: "can't process your request, Invalid transaction type",
              result: null,
            })
            return;
          }
          const url = `${walletURL}?requestType=send`;
          let childWindow = window.open(url,"_blank",windowFeatures);
          setRequestType("send")
          setChildWindow(childWindow)
          setTransactionData(params)
          resolvePromise = resolve;
        }
      })
    }

    /**
     * The following function used for checking anduro wallet is in connected state or not 
    */
    const checkWalletConnection = (onError: any, transactionType: string) => {
      let status: boolean = true;
      let error: any = null;
      if (networkState.chainId === null || networkState.networkType === "") {
        status = false
        error = "The wallet is not connected."
      } else if (transactionType && networkState.networkType === requestTypes.bitcoin) {
        status = false
        error = "can't process your request, Invalid transaction type."
      }
      if (!status) {
        onError({
          status: status,
          result: null,
          error,
        })
      }
      return status
    }

    /**
     * The following function used for setting networking information send BTC / CBTC in anduro wallet
    */
    const validateSendTransactionType = (transactionType: string) => {
      let status: boolean = false
      if (transactionType === requestTypes.normal) {
        status = true
      } else if (transactionType === requestTypes.pegin) {
        status = networkState.networkType === requestTypes.bitcoin
      } else if (transactionType === requestTypes.pegout) {
        status = networkState.networkType === requestTypes.sidechain
      }
      return status
    }

    /**
     * The following function used for creating asset in anduro wallet
    */
    const createasset = (params: CreateassetParams) => {
      return new Promise((resolve, reject) => {
        if (checkWalletConnection(resolve, params.transactionType)) {
          const url = `${walletURL}?requestType=create-asset`;
          let childWindow = window.open(url,"_blank",windowFeatures);
          setRequestType("create-asset")
          setChildWindow(childWindow)
          setCreateAssetData(params)
          resolvePromise = resolve;
        }
      })
    }

    /**
     * The following function used for transfer asset / mint  in anduro wallet
    */
    const transferasset = (params: TransferAssetParams) => {
      return new Promise((resolve, reject) => {
        if (checkWalletConnection(resolve, "transfer")) {
          const url = `${walletURL}?requestType=transfer-asset`;
          let childWindow = window.open(url,"_blank",windowFeatures);
          setRequestType("transfer-asset")
          setChildWindow(childWindow)
          setTransferAssetData(params)
          resolvePromise = resolve;
        }
      })
    }

    const { children } = props
    return (
      <useConnector.Provider
        value={{
          walletState,
          networkState,
          connect,
          disconnect,
          send,
          createasset,
          transferasset,
        }}
      >
        {children}
      </useConnector.Provider>
    )
}
