"use client"
import React, { useContext } from "react"
import { useConnector } from "anduro-wallet-connector-react"
import Link from "next/link"
import { ConnectorVW } from "./UI/connectorVW"
export default function Home() {
  const {
    networkState,
    walletState,
    connect,
    disconnect,
    networkInfo,
    signTransaction,
    sendTransaction,
    signAndSendTransaction,
  } = useContext<any>(useConnector)
  const [isWalletConnected, setIsWalletConnected] = React.useState<string>("false")
  const [signedHex, setSignedHex] = React.useState<string>("")
  const handleConnectionAction = async () => {
    const result = await connect({
      chainId: 1,
    })
    console.log("*******Connect Result", result)
    if (result.status === true) {
      localStorage.setItem("isWalletConnected", "true")
      setIsWalletConnected("true")
    }
  }
  const handleNetworkInfo = async () => {
    const result = await networkInfo()
    console.log("*******handle NetworkInfo Result", result)
    if (result.status === true) {
      localStorage.setItem("isWalletConnected", "true")
      setIsWalletConnected("true")
    } else {
      localStorage.removeItem("isWalletConnected")
      setIsWalletConnected("false")
    }
  }
  const handleDisconnectionAction = async () => {
    const result = await disconnect()
    console.log("*******Disconnect Result", result)
    if (result.status === true) {
      localStorage.removeItem("isWalletConnected")
      setIsWalletConnected("false")
    }
  }
  React.useEffect(() => {
    console.log("Connector Network Information", networkState)
    console.log("Connector Wallet Information", walletState)
    setIsWalletConnected(localStorage.getItem("isWalletConnected") || "false")
  }, [walletState, networkState])

  const signTransactions = async () => {
    const hex =
      "70736274ff01009a02000000028bf1e9f7f9ef7c48abd8f4dcdc789ee180c98aec939937caf92575d1fedf8fdf0000000000fdffffff8bf1e9f7f9ef7c48abd8f4dcdc789ee180c98aec939937caf92575d1fedf8fdf0100000000fdffffff02a0860100000000001600146b41afa7b10c280bf47a0cc210ce993a799d20ba0242993b0000000016001487c0e3fde4222b9e5f9bb2e442d67a9f37cd2dbc000000000001011f1027000000000000160014c7213dd2f66ff6513861559a41f617d1ce4374870001011f63a29a3b000000001600146b41afa7b10c280bf47a0cc210ce993a799d20ba000000"
    const signResult = await signTransaction({
      hex,
    })
    console.log("===== SIGN RESULT EXAMPLE ======", signResult)
    if (signResult.status) {
      setSignedHex(signResult.result.signedHex)
    }
  }
  const sendTransactions = async () => {
    const sendResult = await sendTransaction({
      hex: signedHex,
    })
    console.log("===== SEND RESULT EXAMPLE ======", sendResult)
  }
  const signAndSendTransactions = async () => {
    const hex =
      "70736274ff01009a020000000257d93fc1eb5a9c62741e250a348a28b63d74e1f0cb7e78b7ee995b8f41b62bda0000000000fdffffffc631ad618014d7f4a9636e0f80cc5c51d99a2da93c5c612032cf607ce0dde4ea0100000000fdffffff0200c2eb0b000000001600146b41afa7b10c280bf47a0cc210ce993a799d20bacf8db02f0000000016001487c0e3fde4222b9e5f9bb2e442d67a9f37cd2dbc000000000001011fa0860100000000001600146b41afa7b10c280bf47a0cc210ce993a799d20ba0001011f00ca9a3b000000001600146b41afa7b10c280bf47a0cc210ce993a799d20ba000000"
    const transactionResult = await signAndSendTransaction({
      hex,
    })
    console.log("===== SIGN AND SEND TRANSACTION RESULT EXAMPLE ======", transactionResult)
  }
  return (
    <div>
      {walletState.accountPublicKey === "" && isWalletConnected === "false" && (
        <ConnectorVW
          title="Connect wallet"
          buttonName="Connect"
          handleClickAction={handleConnectionAction}
        />
      )}
      {(walletState.accountPublicKey !== "" || isWalletConnected === "true") && (
        <div className="connect_page">
          <div className="display-flex">
            <div className="breadcrumb">
              <Link href="/sign">Sign</Link>
            </div>
            <div className="breadcrumb">
              <Link href="/send">Send</Link>
            </div>
            <div className="breadcrumb">
              <Link href="/transferasset">Transfer</Link>
            </div>
          </div>
          {walletState.accountPublicKey !== "" && (
            <>
              <ConnectorVW
                title="Disconnect Wallet"
                buttonName="Disconnect"
                handleClickAction={handleDisconnectionAction}
              />
              <ConnectorVW
                title="Sign Transaction"
                buttonName="Sign"
                handleClickAction={signTransactions}
              />
              <ConnectorVW
                title="Send Transaction"
                buttonName="Send Transaction"
                handleClickAction={sendTransactions}
              />
              <ConnectorVW
                title="Sign and Send Transaction"
                buttonName="Sign and Send Transaction"
                handleClickAction={signAndSendTransactions}
              />
            </>
          )}
          {walletState.accountPublicKey === "" && (
            <ConnectorVW
              title="Connect wallet"
              buttonName="Initialize"
              handleClickAction={handleNetworkInfo}
            />
          )}
        </div>
      )}
    </div>
  )
}
