/*
Project : Anduro Wallet Connector
FileName : useConnector.tsx
Author : 
File Created : 04/03/2024
CopyRights : 
Purpose : This is the file that is used to handle connect , disconnect and manage anduro wallet.
*/
import React, { useState, useEffect, useRef } from "react"
import { ERROR_MESSAGES } from "../helpers/errorMessages"
import { handleErrorResponse, handleSuccessResponse } from "../helpers/handleResponse"
import { openWalletWindow } from "../helpers/handleWalletWindow"
import { WALLETURL } from "../config/walletApi"

interface WalletState {
  accountPublicKey: string
  connectionState: string
  address: string
  accountXpubKey: string
}
interface NetworkState {
  chainId: any
  networkType: string
}
interface connectParams {
  chainId: number
}
interface SignParams {
  message?: string
}
interface createTransactionParams {
  transactionType?: string
  amount?: number
  receiverAddress?: string | undefined
  feeRate?: number | undefined
}
interface PropertiesType {
  type: string
  value: string
}
interface CreateassetParams {
  name?: string
  symbol?: string
  imageUrl?: string
  supply?: number
  properties?: PropertiesType[]
  assetType?: number
  transactionType?: string
  receiverAddress?: string | undefined
  assetId?: number | undefined
  precision?: number | undefined
}
interface TransferAssetParams {
  assetId?: number
  receiverAddress?: string
  supply?: number
}
interface SignTransactionParams {
  hex: string
  transactionType: string
}
enum RequestTypes {
  connect = "connect",
  disconnected = "disconnect",
  accountNotCreated = "account-not-created",
  walletLoaded = "wallet-loaded",
  networkinfo = "networkinfo",
  send = "send",
  createAsset = "create-asset",
  transferAsset = "transfer-asset",
  sign = "sign",
  signTransaction = "sign-transaction",
  sendTransaction = "send-transaction",
  signAndSendTransaction = "sign-and-send-transaction",
  sendAlys = "send-alys",
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
  alys = "alys",
  normal = "normal",
  pegin = "pegin",
  pegout = "pegout",
}

type UseConnectorContextContextType = {
  networkState: NetworkState
  walletState: WalletState
  connect: (params: connectParams) => object
  networkInfo: () => object
  sign: (params: SignParams) => object
  transferasset: (params: TransferAssetParams) => object
  createasset: (params: CreateassetParams) => object
  send: (params: createTransactionParams) => object
  disconnect: () => object
  signTransaction: (params: SignTransactionParams) => object
  sendTransaction: (params: SignTransactionParams) => object
  signAndSendTransaction: (params: SignTransactionParams) => object
  signAlysTransaction: (params: SignTransactionParams) => object
}
export const useConnector = React.createContext<UseConnectorContextContextType | null>(null)
let resolvePromise: any = null
export const UseConnectorProvider = (props: any) => {
  const [childWindow, setChildWindow] = useState<any>(null)
  const [requestType, setRequestType] = useState<RequestTypes>()
  const [transactionData, setTransactionData] = useState<createTransactionParams>({})
  const [signData, setSignData] = useState<SignParams>({})
  const [requestData, setRequestData] = React.useState<any>(null)
  const [createAssetData, setCreateAssetData] = React.useState<CreateassetParams>({})
  const [transferAssetData, setTransferAssetData] = React.useState<TransferAssetParams>({})
  const [networkState, setNetworkState] = React.useState<NetworkState>({
    chainId: null,
    networkType: "",
  })
  const [walletState, setWalletState] = React.useState<WalletState>({
    accountPublicKey: "",
    connectionState: "disconnected",
    address: "",
    accountXpubKey: "",
  })
  const [signTransactionData, setSignTransactionData] = useState<SignTransactionParams>()

  useEffect(() => {
    if (childWindow != null) {
      window.addEventListener("message", handleMessage)
      return () => {
        window.removeEventListener("message", handleMessage)
      }
    }
  }, [childWindow])

  /**
   * The following function used for listening messages from anduro wallet extension
   *
   * @param event Event message
   *
   */
  const handleMessage = (event: any) => {
    if (!event.data.type) return false

    console.log("event.data", event.data)
    if (
      event.data.type == "webpackOk" ||
      (event.data.error && event.data.error.type === "webpackInvalid")
    )
      return false

    if (event.data.type === RequestTypes.walletLoaded) return handlewalletLoadedMessage()

    if (childWindow) childWindow.close()

    if (!event.data.status) {
      if (resolvePromise) {
        return resolvePromise(handleErrorResponse(event.data.error ? event.data.error : event.data))
      } else {
        return handleErrorResponse(event.data.error ? event.data.error : event.data)
      }
    }

    switch (event.data.type) {
      case ResponseTypes.connectionResponse:
        updateNetworkInformation(event.data.result)
        updateWalletInformation(
          "connected",
          event.data.result.accountPublicKey,
          event.data.result.address,
          event.data.result.xpubKey,
        )
        resolvePromise(handleSuccessResponse(event.data))
        break
      case RequestTypes.accountNotCreated:
        if (resolvePromise) resolvePromise(handleErrorResponse(event.data))
        break
      case ResponseTypes.networkinfoResponse:
        updateNetworkInformation(event.data.result)
        updateWalletInformation(
          "connected",
          event.data.result.accountPublicKey,
          event.data.result.address,
          event.data.result.xpubKey,
        )
        if (resolvePromise) resolvePromise(handleSuccessResponse(event.data))
        break
      case ResponseTypes.disconnectResponse:
        updateNetworkInformation({ chainId: null, networkType: "" })
        updateWalletInformation("disconnected", "", "", "")
        if (resolvePromise) resolvePromise(handleSuccessResponse(event.data))
        break
      default:
        if (resolvePromise) resolvePromise(handleSuccessResponse(event.data))
        break
    }
  }
  /**
   * The following function used for listening messages from wallet and once wallet loaded, send message to child window
   */
  const handlewalletLoadedMessage = () => {
    if (requestType === RequestTypes.connect || requestType === RequestTypes.disconnected) {
      sendMessageToChildWindow({
        requestType,
        siteurl: window.location.origin,
        chainId: requestData ? requestData.chainId : 0,
      })
    } else if (requestType === RequestTypes.networkinfo) {
      sendMessageToChildWindow({
        requestType: requestType,
        siteurl: window.location.origin,
      })
    } else if (requestType === RequestTypes.send) {
      sendMessageToChildWindow({
        requestType: requestType,
        transactionType: transactionData.transactionType,
        amount: transactionData.amount,
        receiverAddress: transactionData.receiverAddress,
        feerate: transactionData.feeRate,
        chainId: networkState.chainId,
      })
    } else if (requestType === RequestTypes.createAsset) {
      console.log("createAssetData", createAssetData)
      const formValues = {
        headline: createAssetData.name,
        imageUrl: createAssetData.imageUrl,
        supply: createAssetData.supply,
        imagebase64Data: { data: "", type: "" },
        symbol: createAssetData.symbol,
      }
      sendMessageToChildWindow({
        requestType: requestType,
        transactionType: createAssetData.transactionType,
        formValues,
        assetType: createAssetData.assetType,
        properties: createAssetData.properties,
        chainId: networkState.chainId,
        supply: createAssetData.supply,
        receiverAddress: createAssetData.receiverAddress,
        assetId: createAssetData.assetId,
        precision: createAssetData.precision,
      })
    } else if (requestType === RequestTypes.transferAsset) {
      sendMessageToChildWindow({
        requestType: requestType,
        chainId: networkState.chainId,
        supply: transferAssetData.supply,
        receiverAddress: transferAssetData.receiverAddress,
        assetId: transferAssetData.assetId,
      })
    } else if (requestType === RequestTypes.sign) {
      sendMessageToChildWindow({
        requestType: requestType,
        chainId: networkState.chainId,
        message: signData.message,
      })
    } else if (
      requestType === RequestTypes.signTransaction ||
      requestType === RequestTypes.sendTransaction ||
      requestType === RequestTypes.signAndSendTransaction
    ) {
      sendMessageToChildWindow({
        requestType: requestType,
        chainId: networkState.chainId,
        hex: signTransactionData?.hex,
        transactionType: signTransactionData?.transactionType,
      })
    } else if (requestType === RequestTypes.sendAlys) {
      sendMessageToChildWindow({
        requestType: requestType,
        chainId: networkState.chainId,
        hex: signTransactionData?.hex,
      })
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
  const updateWalletInformation = (
    connectionState: string,
    accountPublicKey: string,
    address: string,
    xpubKey: string,
  ) => {
    setWalletState({
      accountPublicKey: accountPublicKey,
      connectionState: connectionState,
      address: address,
      accountXpubKey: xpubKey,
    })
  }

  /**
   * The following function used for connecting anduro wallet extension
   *
   * @param chainId Chain ID for connecting the Anduro wallet
   *
   */
  const connect = async (params: connectParams) => {
    return new Promise((resolve) => {
      const url = `${WALLETURL}?requestType=${RequestTypes.connect}`
      let childWindow = openWalletWindow(url)
      setRequestType(RequestTypes.connect)
      setChildWindow(childWindow)
      setRequestData({
        chainId: params.chainId,
      })
      updateWalletInformation("connecting", "", "", "")
      resolvePromise = resolve
    })
  }

  /**
   * The following function used for initialize wallet and get network info
   */
  const networkInfo = async () => {
    return new Promise((resolve) => {
      const url = `${WALLETURL}?requestType=${RequestTypes.networkinfo}`
      let childWindow = openWalletWindow(url)
      setRequestType(RequestTypes.networkinfo)
      setChildWindow(childWindow)
      resolvePromise = resolve
    })
  }
  /**
   * The following function used for disconnecting anduro wallet extension
   */
  const disconnect = () => {
    return new Promise((resolve) => {
      const url = `${WALLETURL}?requestType=${RequestTypes.disconnected}&from=${window.location.origin}`
      let childWindow = openWalletWindow(url)
      setRequestType(RequestTypes.disconnected)
      setChildWindow(childWindow)
      updateWalletInformation("disconnecting", "", "", "")
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
    if (!params.transactionType) return handleErrorResponse(ERROR_MESSAGES.transactionTypeRequired)

    if (!params.amount) return handleErrorResponse(ERROR_MESSAGES.amountRequired)

    if (!validateSendTransactionType(params.transactionType))
      return handleErrorResponse(ERROR_MESSAGES.transactionTypeInvalid)

    return new Promise((resolve) => {
      if (checkWalletConnection(resolve, "") && params.transactionType) {
        const url = `${WALLETURL}?requestType=${RequestTypes.send}`
        let childWindow = openWalletWindow(url)
        setRequestType(RequestTypes.send)
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
      error = ERROR_MESSAGES.walletNotConnected
    } else if (transactionType && networkState.networkType === TransactionTypes.bitcoin) {
      status = false
      error = ERROR_MESSAGES.transactionTypeInvalid
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
      status =
        networkState.networkType === TransactionTypes.sidechain ||
        networkState.networkType === TransactionTypes.alys
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
    if (!params.transactionType) return handleErrorResponse(ERROR_MESSAGES.transactionTypeRequired)

    if (params.transactionType === "create" && !params.name)
      return handleErrorResponse(ERROR_MESSAGES.nameRequired)

    if (params.transactionType === "create" && !params.symbol)
      return handleErrorResponse(ERROR_MESSAGES.symbolRequired)

    if (params.transactionType === "create" && !params.imageUrl)
      return handleErrorResponse(ERROR_MESSAGES.imageUrlRequired)

    if (!params.supply) return handleErrorResponse(ERROR_MESSAGES.supplyRequired)

    if (params.assetType === 0 && params.transactionType === "create" && !params.precision)
      return handleErrorResponse(ERROR_MESSAGES.precisionRequired)

    if (params.assetType === undefined || params.assetType === null)
      return handleErrorResponse(ERROR_MESSAGES.assetTypeRequired)

    return new Promise((resolve) => {
      if (params.transactionType && checkWalletConnection(resolve, params.transactionType)) {
        const url = `${WALLETURL}?requestType=${RequestTypes.createAsset}`
        let childWindow = openWalletWindow(url)
        setRequestType(RequestTypes.createAsset)
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
    if (!params.assetId) return handleErrorResponse(ERROR_MESSAGES.assetIdRequired)

    if (!params.receiverAddress) return handleErrorResponse(ERROR_MESSAGES.receiverAddressRequired)

    if (!params.supply) return handleErrorResponse(ERROR_MESSAGES.supplyRequired)

    return new Promise((resolve) => {
      if (checkWalletConnection(resolve, "transfer")) {
        const url = `${WALLETURL}?requestType=${RequestTypes.transferAsset}`
        let childWindow = openWalletWindow(url)
        setRequestType(RequestTypes.transferAsset)
        setChildWindow(childWindow)
        setTransferAssetData(params)
        resolvePromise = resolve
      }
    })
  }

  /**
   * The following function used for sign process
   *
   * @param message The sign message
   *
   */
  const sign = (params: SignParams) => {
    return new Promise((resolve) => {
      if (checkWalletConnection(resolve, "")) {
        const url = `${WALLETURL}?requestType=${RequestTypes.sign}`
        let childWindow = openWalletWindow(url)
        setRequestType(RequestTypes.sign)
        setChildWindow(childWindow)
        setSignData(params)
        resolvePromise = resolve
      }
    })
  }

  /**
   * The following function used for sign process
   *
   * @param hex The raw transaction hex
   *
   */
  const signTransaction = (params: SignTransactionParams) => {
    return new Promise((resolve) => {
      if (checkWalletConnection(resolve, "")) {
        const url = `${WALLETURL}?requestType=${RequestTypes.signTransaction}`
        let childWindow = openWalletWindow(url)
        setRequestType(RequestTypes.signTransaction)
        setChildWindow(childWindow)
        setSignTransactionData(params)
        resolvePromise = resolve
      }
    })
  }

  /**
   * The following function used for sign process
   *
   * @param hex The raw transaction hex
   *
   */
  const signAlysTransaction = (params: SignTransactionParams) => {
    console.log("params----------------", params)
    return new Promise((resolve) => {
      if (checkWalletConnection(resolve, "")) {
        const url = `${WALLETURL}?requestType=${RequestTypes.sendAlys}`
        let childWindow = openWalletWindow(url)
        setRequestType(RequestTypes.sendAlys)
        setChildWindow(childWindow)
        console.log("params-------------------- : ", params)
        setSignTransactionData(params)
        resolvePromise = resolve
      }
    })
  }
  /**
   * The following function used for sign process
   *
   * @param hex The signed transaction hex
   *
   */
  const sendTransaction = (params: SignTransactionParams) => {
    return new Promise((resolve) => {
      if (
        checkWalletConnection(resolve, "") &&
        validateTransactionVersion(params.transactionType, resolve)
      ) {
        const url = `${WALLETURL}?requestType=${RequestTypes.sendTransaction}`
        let childWindow = openWalletWindow(url)
        setRequestType(RequestTypes.sendTransaction)
        setChildWindow(childWindow)
        setSignTransactionData(params)
        resolvePromise = resolve
      }
    })
  }
  /**
   * The following function used for sign process
   *
   * @param hex The signed transaction hex
   *
   */
  const signAndSendTransaction = (params: SignTransactionParams) => {
    return new Promise((resolve) => {
      if (
        checkWalletConnection(resolve, "") &&
        validateTransactionVersion(params.transactionType, resolve)
      ) {
        const url = `${WALLETURL}?requestType=${RequestTypes.signAndSendTransaction}`
        let childWindow = openWalletWindow(url)
        setRequestType(RequestTypes.signAndSendTransaction)
        setChildWindow(childWindow)
        setSignTransactionData(params)
        resolvePromise = resolve
      }
    })
  }
  const validateTransactionVersion = (type: string, resolve: any): boolean => {
    const transactionTypes: string[] = ["normal", "premium"]
    if (!transactionTypes.includes(type)) {
      resolve({
        status: false,
        result: null,
        error: ERROR_MESSAGES.transactionTypeInvalid,
      })
      return false
    }
    return true
  }

  const { children } = props
  return (
    <useConnector.Provider
      value={{
        walletState,
        networkState,
        connect,
        networkInfo,
        disconnect,
        send,
        createasset,
        transferasset,
        sign,
        signTransaction,
        sendTransaction,
        signAndSendTransaction,
        signAlysTransaction,
      }}
    >
      {children}
    </useConnector.Provider>
  )
}
