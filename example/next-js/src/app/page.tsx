"use client"
import React, { useContext } from "react"
import { useConnector } from "anduro-wallet-connector"
import Link from "next/link"
import { ConnectorVW } from "./UI/connectorVW"
import { WALLETURL } from "./config/config"
export default function Home() {
  const { networkState, walletState, connect, disconnect, networkInfo } =
    useContext<any>(useConnector)
  const [isWalletConnected, setIsWalletConnected] = React.useState<string>("false")
  const handleConnectionAction = async () => {
    const result = await connect({
      chainId: 4,
      walletURL: WALLETURL,
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
              <Link href="/createasset">Create Asset</Link>
            </div>
            <div className="breadcrumb">
              <Link href="/transferasset">Transfer</Link>
            </div>
          </div>
          {walletState.accountPublicKey !== "" && (
            <ConnectorVW
              title="Disconnect Wallet"
              buttonName="Disconnect"
              handleClickAction={handleDisconnectionAction}
            />
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
