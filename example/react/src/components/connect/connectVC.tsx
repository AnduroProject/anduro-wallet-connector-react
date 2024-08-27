import React, { useContext } from "react"
import { ConnectorVW } from "../../UI/connectorVW"
import { useConnector } from "anduro-wallet-connector-react"
import { Link } from "react-router-dom"
export const ConnectorVC = () => {
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
  const [rawHex, setRawHex] = React.useState<string>("")
  const handleConnectionAction = async () => {
    const result = await connect({
      chainId: 2,
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
    const signResult = await signTransaction({
      hex: rawHex,
    })
    console.log("===== SIGN RESULT EXAMPLE ======", signResult)
    if (signResult.status) {
      setSignedHex(signResult.result.signedHex)
    }
  }
  const sendTransactions = async (type: string) => {
    const sendResult = await sendTransaction({
      hex: signedHex,
      transactionType: type,
    })
    console.log("===== SEND RESULT EXAMPLE ======", sendResult)
  }
  const signAndSendTransactions = async (type: string) => {
    const transactionResult = await signAndSendTransaction({
      hex: rawHex,
      transactionType: type,
    })
    console.log("===== SIGN AND SEND TRANSACTION RESULT EXAMPLE ======", transactionResult)
  }
  return (
    <div>
      {(walletState.accountPublicKey === "" || walletState.address === "") &&
        isWalletConnected === "false" && (
          <ConnectorVW
            title="Connect wallet"
            buttonName="Connect"
            handleClickAction={handleConnectionAction}
          />
        )}
      {(walletState.accountPublicKey !== "" ||
        walletState.address !== "" ||
        isWalletConnected === "true") && (
        <div className="connect_page">
          <div className="display-flex">
            <div className="breadcrumb">
              <Link to="/sign">Sign</Link>
            </div>
            <div className="breadcrumb">
              <Link to="/send">Send</Link>
            </div>
            <div className="breadcrumb">
              <Link to="/sendAlys">Send Alys</Link>
            </div>
            <div className="breadcrumb">
              <Link to="/transfer">Transfer</Link>
            </div>
          </div>
          {(walletState.accountPublicKey !== "" || walletState.address !== "") && (
            <div>
              <ConnectorVW
                title="Disconnect Wallet"
                buttonName="Disconnect"
                handleClickAction={handleDisconnectionAction}
              />
              <div className="col-sm-12 col-md-12 col-lg-7">
                <div className="input_padd">
                  <input
                    id="name"
                    type="text"
                    placeholder="RAW HEX"
                    value={rawHex}
                    onChange={(event) => setRawHex(event.target.value)}
                  />
                </div>
              </div>
              <ConnectorVW
                title="Sign Transaction"
                buttonName="Sign"
                handleClickAction={signTransactions}
              />
              <ConnectorVW
                title="Send Normal Transaction"
                buttonName="Send Normal Transaction"
                handleClickAction={() => sendTransactions("normal")}
              />
              <ConnectorVW
                title="Send Premium Transaction"
                buttonName="Send Premium Transaction"
                handleClickAction={() => sendTransactions("premium")}
              />
              <ConnectorVW
                title="Sign and Send Normal Transaction"
                buttonName="Sign and Send Normal Transaction"
                handleClickAction={() => signAndSendTransactions("normal")}
              />
              <ConnectorVW
                title="Sign and Send Premium Transaction"
                buttonName="Sign and Send Premium Transaction"
                handleClickAction={() => signAndSendTransactions("premium")}
              />
            </div>
          )}
          {(walletState.accountPublicKey === "" || walletState.address === "") && (
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
