/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/*
Project : Anduro Wallet Connector
FileName : useConnector.tsx
Author :
File Created : 04/03/2024
CopyRights :
Purpose : This is the file that is used to handle connect , disconnect and manage anduro wallet.
*/

import React, { useState, useEffect } from "react"

interface WalletState {
  accountPublicKey: string
  connectionState: string
}
interface NetworkState {
  chainId: any
  networkType: string
}
interface connectParams {
  chainId: number
}
interface createTransactionParams {
  transactionType: string
  amount: number
  receiverAddress?: string | undefined
  feeRate?: number | undefined
}
interface PropertiesType {
  type: string
  value: string
}
interface CreateassetParams {
  name: string
  symbol: string
  imageUrl: string
  supply: number
  properties: PropertiesType[]
  assetType: number
  transactionType: string
  receiverAddress?: string | undefined
  assetId?: number | undefined
}
interface TransferAssetParams {
  assetId: number
  receiverAddress: string
  supply: number
}
// eslint-disable-next-line no-unused-vars
enum RequestTypes {
  connect = "connect",
  disconnected = "disconnect",
  accountNotCreated = "account-not-created",
  walletLoaded = "wallet-loaded",
  networkinfo = "networkinfo",
  send = "send",
  createAsset = "create-asset",
  transferAsset = "transfer-asset",
}

enum ResponseTypes {
  connectionResponse = "connection-response",
  networkinfoResponse = "networkinfo-response",
  sendResponse = "send-response",
  createAssetResponse = "create-asset-response",
  disconnectResponse = "disconnect-response",
}

enum TransactionTypes {
  bitcoin = "bitcoin",
  sidechain = "sidechain",
  normal = "normal",
  pegin = "pegin",
  pegout = "pegout",
}

type UseConnectorContextContextType = {
  networkState: NetworkState
  walletState: WalletState
  connect: (params: connectParams) => any
  transferasset: (params: TransferAssetParams) => any
  createasset: (params: CreateassetParams) => any
  send: (params: createTransactionParams) => any
  disconnect: () => any
}
export const useConnector = React.createContext<UseConnectorContextContextType | null>(null)
let resolvePromise: any = null
export const UseConnectorProvider = (props: any) => {
  const [childWindow, setChildWindow] = useState<any>(null)
  const [currentRequestType, setCurrentRequestType] = useState<String>(RequestTypes.connect)
  const [transactionData, setTransactionData] = useState<createTransactionParams>({
    transactionType: "",
    amount: 0,
    receiverAddress: "",
    feeRate: 1,
  })
  const [requestData, setRequestData] = React.useState<any>(null)
  const [createAssetData, setCreateAssetData] = React.useState<CreateassetParams>({
    name: "",
    symbol: "",
    imageUrl: "",
    supply: 0,
    properties: [{ type: "", value: "" }],
    assetType: 0,
    transactionType: "",
    receiverAddress: "",
  })
  const [transferAssetData, setTransferAssetData] = React.useState<TransferAssetParams>({
    assetId: 0,
    receiverAddress: "",
    supply: 0,
  })
  const [networkState, setNetworkState] = React.useState<NetworkState>({
    chainId: null,
    networkType: "",
  })
  const [walletState, setWalletState] = React.useState<WalletState>({
    accountPublicKey: "",
    connectionState: "disconnected",
  })
  const [walletURL, setWalletURL] = useState(localStorage.getItem("walletURL") || props.walletURL)

  useEffect(() => {
    if (networkState.chainId === null && currentRequestType !== "disconnect") {
      const url = `${walletURL}?requestType=networkinfo`
      let targetWindow: any = openWalletWindow(url)
      setChildWindow(targetWindow)
      setCurrentRequestType(RequestTypes.networkinfo)
    }
  }, [networkState])

  useEffect(() => {
    if (childWindow != null) {
      window.addEventListener("message", handleMessage)
      return () => {
        window.removeEventListener("message", handleMessage)
      }
    }
  }, [childWindow])
  useEffect(() => {
    if (
      (localStorage.getItem("walletURL") &&
        localStorage.getItem("walletURL") !== props.walletURL) ||
      (localStorage.getItem("walletURL") === null && props.walletURL)
    ) {
      localStorage.setItem("walletURL", props.walletURL)
    }
  }, [])

  /**
   * The following function used to handle wallet window opening part
   * @param url The URL of the page to open.
   * @returns A reference to the opened window
   */
  const openWalletWindow = (url: any) => {
    var inputWidth = 370
    var inputHeight = 550
    const viewportwidth = document.documentElement.clientWidth
    const tempW: any = window.top?.outerWidth
    const tempH: any = window.top?.outerHeight
    const tempSY: any = window.top?.screenY
    const tempSX: any = window.top?.screenX
    var y = tempH / 2 + tempSY - inputHeight / 2
    var x = tempW / 2 + tempSX - inputWidth / 2
    if (viewportwidth > 800) {
      x = viewportwidth - 300
      y = 0
    }
    return window.open(
      url,
      "_blank",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${inputWidth}, height=${inputHeight}, right=0, top=${y}, left=${x}`,
    )
  }

  /**
   * The following function used hanlde response structure
   * @param status
   * @param result
   * @param error
   * @returns
   */
  const handleResponse = (status: Boolean, result: any, error: any = null) => {
    return { status, result, error }
  }

  /**
   * The following function used for listening messages from anduro wallet extension
   *
   * @param event Event message
   *
   */
  const handleMessage = (event: any) => {
    if (event.data.type === ResponseTypes.connectionResponse) {
      if (event.data.status) {
        childWindow.close()
        updateNetworkInformation(event.data.result)
        updateWalletInformation("connected", event.data.result.accountPublicKey)
        resolvePromise(handleResponse(true, event.data))
      } else {
        resolvePromise(handleResponse(false, null, event.data))
      }
    } else if (event.data.type === RequestTypes.accountNotCreated) {
      childWindow.close()
      if (resolvePromise) {
        resolvePromise(handleResponse(false, null, event.data))
      }
    } else if (event.data.type === RequestTypes.walletLoaded) {
      if (event.data.status) {
        if (
          currentRequestType === RequestTypes.connect ||
          currentRequestType === RequestTypes.disconnected
        ) {
          sendMessageToChildWindow({
            requestType: currentRequestType,
            siteurl: window.location.origin,
            chainId: requestData ? requestData.chainId : 0,
          })
        } else if (currentRequestType === RequestTypes.networkinfo) {
          sendMessageToChildWindow({
            requestType: currentRequestType,
            siteurl: window.location.origin,
          })
        } else if (currentRequestType === RequestTypes.send) {
          sendMessageToChildWindow({
            requestType: currentRequestType,
            transactionType: transactionData.transactionType,
            amount: transactionData.amount,
            receiverAddress: transactionData.receiverAddress,
            feerate: transactionData.feeRate,
            chainId: networkState.chainId,
          })
        } else if (currentRequestType === RequestTypes.createAsset) {
          const formValues = {
            headline: createAssetData.name,
            imageUrl: createAssetData.imageUrl,
            supply: createAssetData.supply,
            imagebase64Data: { data: "", type: "" },
            symbol: createAssetData.symbol,
          }
          sendMessageToChildWindow({
            requestType: currentRequestType,
            transactionType: createAssetData.transactionType,
            formValues,
            assetType: createAssetData.assetType,
            properties: createAssetData.properties,
            chainId: networkState.chainId,
            supply: createAssetData.supply,
            receiverAddress: createAssetData.receiverAddress,
            assetId: createAssetData.assetId,
          })
        } else if (currentRequestType === RequestTypes.transferAsset) {
          sendMessageToChildWindow({
            requestType: currentRequestType,
            chainId: networkState.chainId,
            supply: transferAssetData.supply,
            receiverAddress: transferAssetData.receiverAddress,
            assetId: transferAssetData.assetId,
          })
        }
      }
    } else if (event.data.type === ResponseTypes.networkinfoResponse) {
      childWindow.close()
      if (event.data.status) {
        updateNetworkInformation(event.data.result)
        updateWalletInformation("conneted", event.data.result.accountPublicKey)
      }
    } else if (
      event.data.type === ResponseTypes.sendResponse ||
      event.data.type === ResponseTypes.createAssetResponse
    ) {
      childWindow.close()
      resolvePromise(
        handleResponse(
          event.data.status,
          event.data.status ? event.data : null,
          event.data.status ? null : event.data,
        ),
      )
    } else if (event.data.type === ResponseTypes.disconnectResponse) {
      childWindow.close()
      updateNetworkInformation({ chainId: null, networkType: "" })
      updateWalletInformation("disconnected", "")
    }
  }

  /**
   * The following function used for sending messages to anduro wallet extension
   *
   * @param data Data to send to the wallet
   *
   */
  const sendMessageToChildWindow = (data: any) => {
    childWindow.postMessage(data, "*")
  }

  /**
   * The following function used for setting network information in library
   *
   * @param params Event message
   *
   */
  const updateNetworkInformation = (params: any) => {
    setNetworkState({
      chainId: params.chainId,
      networkType: params.networkType,
    })
  }

  /**
   * The following function used for setting wallet account public key , connection state information in library
   *
   * @param connectionState The connection state of the Anduro wallet
   * @param accountPublicKey The Anduro wallet account public key
   *
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
   * @param chainId Chain ID for connecting the Anduro wallet
   *
   */
  const connect = async (params: connectParams) => {
    return new Promise((resolve, reject) => {
      const url = `${walletURL}?requestType=connect`
      let childWindow = openWalletWindow(url)
      setWalletURL(walletURL)
      setCurrentRequestType(RequestTypes.connect)
      setChildWindow(childWindow)
      setRequestData({
        chainId: params.chainId,
      })
      updateWalletInformation("connecting", "")
      resolvePromise = resolve
    })
  }

  /**
   * The following function used for disconnecting anduro wallet extension
   */
  const disconnect = () => {
    return new Promise((resolve, reject) => {
      const url = `${walletURL}?requestType=disconnect`
      let childWindow = openWalletWindow(url)
      setCurrentRequestType(RequestTypes.disconnected)
      setChildWindow(childWindow)
      updateWalletInformation("disconnecting", "")
      resolvePromise = resolve
    })
  }

  /**
   * The following function used for send BTC / CBTC to receiver and
   * convert BTC to CBTC / CBTC to BTC in anduro wallet
   *
   * @param transactionType transactionType:
   *                          1. normal - Send BTC / CBTC OR CBTC / BTC
   *                          2. pegin - Convert BTC to CBTC
   *                          3. pegout - Convert CBTC to BTC
   * @param amount transaction amount
   * @param receiverAddress (Optional) Receiver address ( coordinate address / bitcoin address )
   * @param feeRate (Optional) Fee rate per virtual byte
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
          return
        }
        const url = `${walletURL}?requestType=send`
        let childWindow = openWalletWindow(url)
        setCurrentRequestType(RequestTypes.send)
        setChildWindow(childWindow)
        setTransactionData(params)
        resolvePromise = resolve
      }
    })
  }

  /**
   * The following function used for checking anduro wallet is in connected state or not
   *
   * @param onError
   * @param transactionType
   *
   */
  const checkWalletConnection = (resolve: any, transactionType: string) => {
    let status: boolean = true
    let error: any = null
    if (networkState.chainId === null || networkState.networkType === "") {
      status = false
      error = "The wallet is not connected."
    } else if (transactionType && networkState.networkType === TransactionTypes.bitcoin) {
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

  /**
   * The following function is used to validate transaction types
   *
   * @param transactionType
   *
   */
  const validateSendTransactionType = (transactionType: string) => {
    let status: boolean = false
    if (transactionType === TransactionTypes.normal) {
      status = true
    } else if (transactionType === TransactionTypes.pegin) {
      status = networkState.networkType === TransactionTypes.bitcoin
    } else if (transactionType === TransactionTypes.pegout) {
      status = networkState.networkType === TransactionTypes.sidechain
    }
    return status
  }

  /**
   * The following function used for creating asset in anduro wallet
   *
   * @param name The asset's name
   * @param symbol The asset's symbol
   * @param imageUrl The asset's image URL
   * @param supply The asset's total supply
   * @param properties The asset's trait data
   * @param assetType assetType :
   *                    1. 0 for creating tokens.
   *                    2. 1 for creating NFT.
   * @param transactionType transactionType: create OR mint
   * @param receiverAddress (Optional) Required for mint transactions
   * @param assetId (Optional) Required for mint transactions
   *
   */
  const createasset = (params: CreateassetParams) => {
    return new Promise((resolve, reject) => {
      if (checkWalletConnection(resolve, params.transactionType)) {
        const url = `${walletURL}?requestType=create-asset`
        let childWindow = openWalletWindow(url)
        setCurrentRequestType(RequestTypes.createAsset)
        setChildWindow(childWindow)
        setCreateAssetData(params)
        resolvePromise = resolve
      }
    })
  }

  /**
   * The following function used for transfer asset / mint  in anduro wallet
   *
   * @param assetId The asset ID
   * @param receiverAddress Receiver Address
   * @param supply supply to transfer
   *
   */
  const transferasset = (params: TransferAssetParams) => {
    return new Promise((resolve, reject) => {
      if (checkWalletConnection(resolve, "transfer")) {
        const url = `${walletURL}?requestType=transfer-asset`
        let childWindow = openWalletWindow(url)
        setCurrentRequestType(RequestTypes.transferAsset)
        setChildWindow(childWindow)
        setTransferAssetData(params)
        resolvePromise = resolve
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
