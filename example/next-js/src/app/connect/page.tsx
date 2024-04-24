"use client"
import React, { useContext } from "react"
import { useConnector } from "anduro-wallet-connector"
import { WALLETURL } from "../config/config"
import { ConnectorVW } from "../UI/connectorVW"
import Link from "next/link"
export default function ConnectorVC() {
  const { networkState, walletState, connect, disconnect } = useContext<any>(useConnector)
  const handleConnectionAction = async () => {
    const result = await connect({
      chainId: 2,
      walletURL: WALLETURL,
    })
    console.log("*******Connect Result", result)
  }
  const handleDisconnectionAction = async () => {
    const result = await disconnect()
    console.log("*******Disconnect Result", result)
  }
  React.useEffect(() => {
    console.log("Connector Network Information", networkState)
    console.log("Connector Wallet Information", walletState)
  }, [walletState, networkState])
  return (
    <div>
      {walletState.accountPublicKey === "" && (
        <ConnectorVW
          title="Connect wallet"
          buttonName="Connect"
          handleClickAction={handleConnectionAction}
        />
      )}
      {walletState.accountPublicKey !== "" && (
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
              <Link href="/transfer">Transfer</Link>
            </div>
          </div>
          <ConnectorVW
            title="Disconnect Wallet"
            buttonName="Disconnect"
            handleClickAction={handleDisconnectionAction}
          />
        </div>
      )}
    </div>
  )
}
