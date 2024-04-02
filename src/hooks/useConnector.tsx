import React, { useState, useEffect } from "react";
import { WALLETURL } from "../config/WalletConfig";

interface WalletState {
    accountPublicKey: string; // wallet account public key
    connectionState: string; // connection state
};
interface NetworkState {
    chainId: any; // Chain ID
    networkType: string; // Chain type (bitcoin OR sidechain)
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
    receiverAddress: string;
    assetId?: number;
}
interface TransferAssetParams {
    assetId: number;
    receiverAddress: string;
    supply: number;
}
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
  connect: any;
  disconnect: any;
  send: any;
  createasset: any;
  transferasset: any;
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
    const windowFeatures = "left=1000,top=100,width=370,height=550,fullscreen=yes,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no, titlebar=no";

    useEffect(() => {
      if (networkState.chainId === null && childWindow === null) {
        const url = `${WALLETURL}?requestType=networkinfo`;
        let targetWindow: any = window.open(url,"_blank",windowFeatures);
        setChildWindow(targetWindow)
        setRequestType("networkinfo")
      }
    }, [networkState]);
    
    useEffect(() => {
      const handleWindowClose = () => {
        alert("Window closed");
      };
      if (childWindow != null) {
        childWindow.addEventListener("close", handleWindowClose);
        window.addEventListener('message', handleMessage);
        return () => {
          window.removeEventListener('message', handleMessage);
        };
      }
    }, [childWindow]);
  
  
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
        console.log("Account Not Created")
        resolvePromise({status: false, result: null})
      } else if (event.data.type === requestTypes.walletLoaded) {
        if (event.data.status) {
          if (requestType === requestTypes.connect || requestType === requestTypes.disconnected) {
            sendMessageToChildWindow({requestType, siteurl: window.location.origin, chainId: requestData.chainId});
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
            updateWalletInformation("connected", event.data.result.accountPublicKey)
        }
      } else if (event.data.type === requestTypes.sendResponse || event.data.type === requestTypes.createAssetResponse) {
        childWindow.close()
        resolvePromise({status: true, result: event.data})
      } else if (event.data.type === requestTypes.disconnectResponse) {
        childWindow.close()
        updateWalletInformation("disconnected", "")
      }
    }
    const sendMessageToChildWindow = (data: any) => {
      childWindow.postMessage(data, "*");
    }
    const updateNetworkInformation = (params: any) => {
        setNetworkState({
            chainId: params.chainId,
            networkType: params.networkType,
        });
    }
    const updateWalletInformation = (connectionState: string, accountPublicKey: string) => {
      setWalletState({
        accountPublicKey: accountPublicKey,
        connectionState: connectionState,
      })
    }
    const connect = async (params: connectParams) => {
      return new Promise((resolve, reject) => {
        const url = `${WALLETURL}?requestType=connect`;
        let childWindow = window.open(url,"_blank",windowFeatures);
        setRequestType("connect")
        setChildWindow(childWindow)
        setRequestData({
          chainId: params.chainId,
        })
        updateWalletInformation("connecting", "")
        resolvePromise = resolve;
      })  
    }
  
    const disconnect = () => {
      return new Promise((resolve, reject) => {
        const url = `${WALLETURL}?requestType=disconnect`;
        let childWindow = window.open(url,"_blank",windowFeatures);
        setRequestType("disconnect")
        setChildWindow(childWindow)
        updateWalletInformation("disconnecting", "")
        resolvePromise = resolve;
      })
    }
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
          const url = `${WALLETURL}?requestType=send`;
          let childWindow = window.open(url,"_blank",windowFeatures);
          setRequestType("send")
          setChildWindow(childWindow)
          setTransactionData(params)
          resolvePromise = resolve;
        }
      })
    }
    const checkWalletConnection = (resolve: any, transactionType: string) => {
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
        resolve({
          status: status,
          result: null,
          error,
        })
      }
      return status
    }
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
    const createasset = (params: CreateassetParams) => {
      return new Promise((resolve, reject) => {
        if (checkWalletConnection(resolve, params.transactionType)) {
          const url = `${WALLETURL}?requestType=create-asset`;
          let childWindow = window.open(url,"_blank",windowFeatures);
          setRequestType("create-asset")
          setChildWindow(childWindow)
          setCreateAssetData(params)
          resolvePromise = resolve;
        }
      })
    }
    const transferasset = (params: TransferAssetParams) => {
      return new Promise((resolve, reject) => {
        if (checkWalletConnection(resolve, "transfer")) {
          const url = `${WALLETURL}?requestType=transfer-asset`;
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
        networkState,
        walletState,
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
