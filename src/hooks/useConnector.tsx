import React, { useState, useEffect } from "react";

type UseConnectorContextContextType = {
    getNetworkInformation: any;
    getWalletInformation: any;
    connect: any;
    disconnect: any;
    send: any;
    createasset: any;
    transferasset: any;
}

interface WalletInfo {
    accountPublicKey: string; // wallet account public key
    connectionState: string; // connection state
};
interface NetworkInfo {
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
interface WalletInfo {
    accountPublicKey: string; // wallet account public key
    connectionState: string; // connection state
};

export const useConnector = React.createContext<UseConnectorContextContextType | null>(
    null,
)
const walletURL = "http://localhost:5002";
export const UseConnectorProvider = (props: any) => {
    const [childWindow, setChildWindow] = useState<any>(null);
    const [requestType, setRequestType] = useState("");
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
    const [networkInformation, setNetworkInformation] = React.useState<NetworkInfo>({chainId: null, networkType: ""})
    const [walletInformation, setWalletInformation] = React.useState<WalletInfo>({accountPublicKey: "", connectionState: "disconnected"})
    const windowFeatures = "left=1000,top=100,width=370,height=550,fullscreen=yes,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no, titlebar=no";
    
    useEffect(() => {
      if (networkInformation.chainId === null && childWindow === null) {
        const url = `${walletURL}?requestType=networkinfo`;
        let targetWindow: any = window.open(url,"_blank",windowFeatures);
        setChildWindow(targetWindow)
        setRequestType("networkinfo")
      }
    }, [networkInformation]);
    
    useEffect(() => {
      if (childWindow != null) {
        window.addEventListener("close", (event) => {
          alert("Window closed")
        });
        window.addEventListener('message', handleMessage);
        return () => {
          window.removeEventListener('message', handleMessage);
        };
      }
    }, [childWindow]);
  
  
    const handleMessage = (event: any) => {
      console.log("Message Received", event.data)
      if (event.data.type === "connection-response") {
        if (event.data.status) {
          childWindow.close();
          updateNetworkInformation(event.data.result)
          requestData.onComplete(event.data);
          console.log("test22222")
        } else {
          requestData.onComplete(event.data)
        }
      } else if (event.data.type === "account-not-created") {
        childWindow.close()
        requestData.onComplete(event.data)
      } else if (event.data.type === "wallet-loaded") {
        if (event.data.status) {
          if (requestType === "connect" || requestType === "disconnect") {
            sendMessageToChildWindow({requestType, siteurl: window.location.origin, chainId: requestData.chainId});
            console.log("test1")
          } else if (requestType === "networkinfo") {
            sendMessageToChildWindow({requestType: requestType, siteurl: window.location.origin})
          } else if (requestType === "send") {
            sendMessageToChildWindow({requestType: requestType, transactionType: transactionData.transactionType, amount: transactionData.amount, receiverAddress: transactionData.receiverAddress, feerate: transactionData.feeRate, chainId: networkInformation.chainId })
          } else if (requestType === "create-asset") {
            const formValues = {
              headline: createAssetData.name,
              imageUrl: createAssetData.imageUrl,
              supply: createAssetData.supply,
              imagebase64Data: {data: "", type: ""},
              symbol: createAssetData.symbol,
            }
            sendMessageToChildWindow({requestType: requestType, transactionType: createAssetData.transactionType, formValues, assetType: createAssetData.assetType, properties: createAssetData.properties, chainId: networkInformation.chainId, supply: createAssetData.supply, receiverAddress: createAssetData.receiverAddress, assetId: createAssetData.assetId })
          } else if (requestType === "transfer-asset") {
            sendMessageToChildWindow({requestType: requestType, chainId: networkInformation.chainId, supply: transferAssetData.supply, receiverAddress: transferAssetData.receiverAddress, assetId: transferAssetData.assetId })
          }
        }
      } else if (event.data.type === "networkinfo-response") {
        childWindow.close()
        if (event.data.status) {
            updateNetworkInformation(event.data.result)
        }
      } 
      else if (event.data.type === "send-response" || event.data.type === "create-asset-response" || event.data.type === "disconnect-response") {
        childWindow.close()
        if (transactionData.onComplete) {
          transactionData.onComplete(event.data)
        } else if (createAssetData.onComplete) {
          createAssetData.onComplete(event.data)
        }
      }
    }
    const sendMessageToChildWindow = (data: any) => {
      childWindow.postMessage(data, "*");
    }
    const updateNetworkInformation = (params: any) => {
        setNetworkInformation({
            chainId: params.chainId,
            networkType: params.networkType,
        });
        setWalletInformation({
            accountPublicKey: params.accountPublicKey,
            connectionState: params.connectionState,
        })
    }
    const connect = async (params: connectParams) => {
      return new Promise((resolve, reject) => {
        const url = `${walletURL}?requestType=connect`;
        let childWindow = window.open(url,"_blank",windowFeatures);
        setRequestType("connect")
        setChildWindow(childWindow)
        console.log("datares4", params)
        setRequestData({
          chainId: params.chainId,
          onComplete: params.onComplete,
        })
        console.log("datares1", params)
        // walletEvent.on("connectionresponse", async (data) =>{
        //   console.log("datares", data)
        //   let response = await data;
        //   console.log("datares111", response)
        //   resolve(response)
        // })
      })  
    }
  
    const disconnect = () => {
      const url = `${walletURL}?requestType=disconnect`;
      let childWindow = window.open(url,"_blank",windowFeatures);
      setRequestType("disconnect")
      setChildWindow(childWindow)
    }
    const getNetworkInformation = () => {
      return networkInformation;
    }
    const getWalletInformation = () => {
      return walletInformation;
    }
    const send = (params: createTransactionParams) => {
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
        const url = `${walletURL}?requestType=send`;
        let childWindow = window.open(url,"_blank",windowFeatures);
        setRequestType("send")
        setChildWindow(childWindow)
        setTransactionData(params)
      }
    }
    const checkWalletConnection = (onError: any, transactionType: string) => {
      let status: boolean = true;
      let error: any = null;
      if (networkInformation.chainId === null || networkInformation.networkType === "") {
        status = false
        error = "The wallet is not connected."
      } else if (transactionType && networkInformation.networkType === "bitcoin") {
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
      if (transactionType === "normal") {
        status = true
      } else if (transactionType === "pegin") {
        status = networkInformation.networkType === "bitcoin"
      } else if (transactionType === "pegout") {
        status = networkInformation.networkType === "sidechain"
      }
      return status
    }
    const createasset = (params: CreateassetParams) => {
      if (checkWalletConnection(params.onComplete, params.transactionType)) {
        const url = `${walletURL}?requestType=create-asset`;
        let childWindow = window.open(url,"_blank",windowFeatures);
        setRequestType("create-asset")
        setChildWindow(childWindow)
        setCreateAssetData(params)
      }
    }
    const transferasset = (params: TransferAssetParams) => {
      if (checkWalletConnection(params.onComplete, "transfer")) {
        const url = `${walletURL}?requestType=transfer-asset`;
        let childWindow = window.open(url,"_blank",windowFeatures);
        setRequestType("transfer-asset")
        setChildWindow(childWindow)
        setTransferAssetData(params)
      }
    }

  const { children } = props
  return (
    <useConnector.Provider
      value={{
        getNetworkInformation,
        getWalletInformation,
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
