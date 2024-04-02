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
    onComplete: any;
};
interface createTransactionParams {
    transactionType: string;
    amount: number;
    receiverAddress?: string | undefined;
    feeRate?: number | undefined;
    onComplete: any;
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
    onComplete: any;
    assetId?: number;
}
interface TransferAssetParams {
    assetId: number;
    receiverAddress: string;
    supply: number;
    onComplete: any;
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
  isConnected: boolean;
}
export const useConnector = React.createContext<UseConnectorContextContextType | null>(
    null,
)
let resolvePromise: any = null;
export const UseConnectorProvider = (props: any) => {
    const [childWindow, setChildWindow] = useState<any>(null);
    const [requestType, setRequestType] = useState("");
    const [isConnected, setIsConnected] = useState(false);
    const [transactionData, setTransactionData] = useState<createTransactionParams>({
      transactionType: "",
      amount: 0,
      receiverAddress: "",
      feeRate: 1,
      onComplete: null
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
      onComplete: null,
    });
    const [transferAssetData, setTransferAssetData] = React.useState<TransferAssetParams>({
      assetId: 0,
      receiverAddress: "",
      supply: 0,
      onComplete: null,
    });
    const [networkState, setNetworkState] = React.useState<NetworkState>({chainId: null, networkType: ""})
    const [walletState, setWalletState] = React.useState<WalletState>({accountPublicKey: "", connectionState: "disconnected"})
    const windowFeatures = "left=1000,top=100,width=370,height=550,fullscreen=yes,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no, titlebar=no";

    useEffect(() => {
     
      if (networkState.chainId === null && childWindow === null && !isConnected) {
        const url = `${WALLETURL}?requestType=networkinfo`;
        let targetWindow: any = window.open(url,"_blank",windowFeatures);
        setChildWindow(targetWindow)
        setRequestType("networkinfo")
      }
    }, [networkState,isConnected]);
    
    useEffect(() => {
      console.log('isConnectedeeeee1111', isConnected)
      const onUnload = (e: any) => {
        e.preventDefault()
        return (e.returnValue = "Are you sure you want to close?")
      }
      console.log("childWindow :", childWindow)
      if (childWindow != null) {
        console.log("close")
        window.addEventListener("beforeunload", onUnload)
        window.addEventListener('message', handleMessage);
        return () => {
          window.removeEventListener("beforeunload", onUnload)
          window.removeEventListener('message', handleMessage);
        };
      }
      
     
    }, [childWindow,isConnected]);
    
    const handleWindowClose = () => {
      alert("Window closed");
    };
  
    const handleMessage = (event: any) => {
      if (event.data.type === requestTypes.connectionResponse) {
        if (event.data.status) {
          childWindow.close();
          setTimeout(() => {
            setIsConnected(true);
          })          
          console.log('isconnected2222', isConnected)
          updateNetworkInformation(event.data.result)
          requestData.onComplete(event.data);
          console.log("Connection Response received", event.data)
          resolvePromise({status: true, result: event.data})
          updateWalletInformation("connected", event.data.result.accountPublicKey)          
        } else {
          resolvePromise({status: false, result: event.data})
          requestData.onComplete(event.data)
        }
      } else if (event.data.type === requestTypes.accountNotCreated) {
        childWindow.close()
        requestData.onComplete(event.data)
        resolvePromise({status: false, result: event.data})
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
        }
      } 
      else if (event.data.type === requestTypes.sendResponse || event.data.type === requestTypes.createAssetResponse || event.data.type === requestTypes.disconnectResponse) {
        childWindow.close()
        if (transactionData.onComplete || createAssetData.onComplete) {
          resolvePromise({status: true, result: event.data})
        }
        if (event.data.type === "disconnect-response") {
          updateWalletInformation("disconnected", "")
        }
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
          onComplete: params.onComplete,
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
    const getNetworkInformation = () => {
      return networkState;
    }
    const getWalletInformation = () => {
      return walletState;
    }
    const send = (params: createTransactionParams) => {
      return new Promise((resolve, reject) => {
        if (checkWalletConnection(params.onComplete, "")) {
          const validateTransactionTypeResult = validateSendTransactionType(params.transactionType)
          if (!validateTransactionTypeResult) {
            params.onComplete({
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
        if (checkWalletConnection(params.onComplete, params.transactionType)) {
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
        if (checkWalletConnection(params.onComplete, "transfer")) {
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
        walletState,
        networkState,
        connect,
        disconnect,
        send,
        createasset,
        transferasset,
        isConnected,
      }}
    >
      {children}
    </useConnector.Provider>
  )
}
