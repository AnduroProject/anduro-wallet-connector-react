import React, { useEffect, useState } from 'react';
import { EventEmitter } from "events";
import {waitFor} from 'wait-for-event';
import process from 'node:process'

type Props = {
  walletUrl: string;
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
interface NetworkInfo {
  chainId: any; // Chain ID
  networkType: string; // Chain type (bitcoin OR sidechain)
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
enum requestTypes {
  connect = 'connect',
  disconnected = 'disconnected',
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
const walletInformation: WalletInfo = {
    accountPublicKey: "",
    connectionState: requestTypes.disconnected,
}

const networkInformation: NetworkInfo = {
  chainId: null,
  networkType: "",
}
export const useConnector = (props: Props) => {
  const walletEvent = new EventEmitter()
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
  const windowFeatures = "left=1000,top=100,width=370,height=550,fullscreen=yes,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no, status=no, titlebar=no";
  
  useEffect(() => {
    if (networkInformation.chainId === null && childWindow === null) {
      const url = `${props.walletUrl}?requestType=networkinfo`;
      let targetWindow: any = window.open(url,"_blank",windowFeatures);
      setChildWindow(targetWindow)
      setRequestType("networkinfo")
    }
  }, [networkInformation]);
  
  useEffect(() => {
    if (childWindow != null) {
      window.addEventListener("close", (event) => {
        alert("Window closed succesfully ")
      });
      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [childWindow]);


  const handleMessage = (event: any) => {
    console.log("Message Received", event.data)
    if (event.data.type === requestTypes.connectionResponse) {
      if (event.data.status) {
        childWindow.close();
        setNetworkInformation(event.data.result)
        requestData.onComplete(event.data);
        console.log("test22222")
        process.nextTick(() => {
          walletEvent.emit("connectionresponse", event.data);   
        });
      } else {
        requestData.onComplete(event.data)
      }
    } else if (event.data.type === requestTypes.accountNotCreated) {
      childWindow.close()
      requestData.onComplete(event.data)
    } else if (event.data.type === requestTypes.walletLoaded) {
      if (event.data.status) {
        if (requestType === requestTypes.connect || requestType === requestTypes.disconnected) {
          sendMessageToChildWindow({requestType, siteurl: window.location.origin, chainId: requestData.chainId});
          console.log("test1")
          walletEvent.emit("connectionresponse", event.data);   
          process.nextTick(() => {
            walletEvent.emit("connectionresponse", event.data);   
          });
        } else if (requestType === requestTypes.networkinfo) {
          sendMessageToChildWindow({requestType: requestType, siteurl: window.location.origin})
        } else if (requestType === requestTypes.send) {
          sendMessageToChildWindow({requestType: requestType, transactionType: transactionData.transactionType, amount: transactionData.amount, receiverAddress: transactionData.receiverAddress, feerate: transactionData.feeRate, chainId: networkInformation.chainId })
        } else if (requestType === requestTypes.createAsset) {
          const formValues = {
            headline: createAssetData.name,
            imageUrl: createAssetData.imageUrl,
            supply: createAssetData.supply,
            imagebase64Data: {data: "", type: ""},
            symbol: createAssetData.symbol,
          }
          sendMessageToChildWindow({requestType: requestType, transactionType: createAssetData.transactionType, formValues, assetType: createAssetData.assetType, properties: createAssetData.properties, chainId: networkInformation.chainId, supply: createAssetData.supply, receiverAddress: createAssetData.receiverAddress, assetId: createAssetData.assetId })
        } else if (requestType === requestTypes.transferAsset) {
          sendMessageToChildWindow({requestType: requestType, chainId: networkInformation.chainId, supply: transferAssetData.supply, receiverAddress: transferAssetData.receiverAddress, assetId: transferAssetData.assetId })
        }
      }
    } else if (event.data.type === requestTypes.networkinfoResponse) {
      childWindow.close()
      if (event.data.status) {
        setNetworkInformation(event.data.result)
      }
    } 
    else if (event.data.type === requestTypes.sendResponse || event.data.type === requestTypes.createAssetResponse || event.data.type === requestTypes.disconnectResponse) {
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
  const setNetworkInformation = (params: any) => {
    networkInformation.chainId = params.chainId;
    networkInformation.networkType = params.networkType;
    walletInformation.accountPublicKey = params.accountPublicKey;
    walletInformation.connectionState = params.connectionState;
  }
  const connect = (params: connectParams) => {
    return new Promise((resolve, reject) => {
      const url = `${props.walletUrl}?requestType=connect`;
      let childWindow = window.open(url,"_blank",windowFeatures);
      setRequestType("connect")
      setChildWindow(childWindow)
      console.log("datares4", params)
      setRequestData({
        chainId: params.chainId,
        onComplete: params.onComplete,
      })
      console.log("datares1", params)
      setTimeout(function() {
        console.log("kkkk")
       walletEvent.on("connectionresponse", async (data) =>{
        console.log("datares", data)
        let response = await data;
        console.log("datares111", response)
        resolve(response)
      })
      }, 5000)
      // waitFor('connectionresponse', walletEvent, async (data) =>{
      //     console.log("datares", data)
      //     let response = await data;
      //     console.log("datares111", response)
      //     resolve(response)
        
      // });
    })  
   
  }

  const disconnect = () => {
    const url = `${props.walletUrl}?requestType=disconnect`;
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
      const url = `${props.walletUrl}?requestType=send`;
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
    } else if (transactionType && networkInformation.networkType === requestTypes.bitcoin) {
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
      status = networkInformation.networkType === requestTypes.bitcoin
    } else if (transactionType === requestTypes.pegout) {
      status = networkInformation.networkType === requestTypes.sidechain
    }
    return status
  }
  const createasset = (params: CreateassetParams) => {
    if (checkWalletConnection(params.onComplete, params.transactionType)) {
      const url = `${props.walletUrl}?requestType=create-asset`;
      let childWindow = window.open(url,"_blank",windowFeatures);
      setRequestType("create-asset")
      setChildWindow(childWindow)
      setCreateAssetData(params)
    }
  }
  const transferasset = (params: TransferAssetParams) => {
    if (checkWalletConnection(params.onComplete, "transfer")) {
      const url = `${props.walletUrl}?requestType=transfer-asset`;
      let childWindow = window.open(url,"_blank",windowFeatures);
      setRequestType("transfer-asset")
      setChildWindow(childWindow)
      setTransferAssetData(params)
    }
  }

  return {connect, getNetworkInformation, send, createasset, transferasset, disconnect, getWalletInformation}
}