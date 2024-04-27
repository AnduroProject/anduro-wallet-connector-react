import React, { useContext } from "react"
import { ConnectorVW } from "../../UI/connectorVW"
import { useConnector } from "anduro-wallet-connector"
import { Link } from "react-router-dom"
import { WALLETURL } from "../../config/walletApi"
export const ConnectorVC = () => {
  const { networkState, walletState, connect, disconnect, networkInfo } =
    useContext<any>(useConnector)
  const [isWalletConnected, setIsWalletConnected] = React.useState<string>("false")
  const handleConnectionAction = async () => {
    const result = await connect({
      chainId: 2,
      walletURL: WALLETURL,
    })
    console.log("*******Connect Result", result)

    localStorage.setItem("isWalletConnected", "true")
    setIsWalletConnected("true")

  }
  const handleNetworkInfo = async () => {
    const result = await networkInfo()
    console.log("*******handle NetworkInfo Result", result)

    if (result.status) {
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

    localStorage.removeItem("isWalletConnected")
    setIsWalletConnected("false")
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
              <Link to="/sign">Sign</Link>
            </div>
            <div className="breadcrumb">
              <Link to="/send">Send</Link>
            </div>
            <div className="breadcrumb">
              <Link to="/createasset">Create Asset</Link>
            </div>
            <div className="breadcrumb">
              <Link to="/transfer">Transfer</Link>
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
