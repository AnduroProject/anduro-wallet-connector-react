import React, { useContext } from "react"
import { ConnectorVW } from "../../UI/connectorVW"
import { useConnector } from "anduro-wallet-connector"
import { Link } from "react-router-dom"
import { WALLETURL } from "../../config/walletApi"
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
  const handleConnectionAction = async () => {
    const result = await connect({
      chainId: 2,
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

  const signTransactions = async () => {
    const hex =
      "70736274ff0100710200000001f0b9e542909b19b2257aac1029864db4838848cbff64168492f81d325a4c20510100000000fdffffff0200c2eb0b00000000160014641625461c815dcb5989ff044cf0233838e842105924725300000000160014758693f2a304ee9c3ba3934911a89761e730b4e100000000000100df020000000001017fead90885ab9be45e1f61ef34718b9d26b9421ae6428400d5b8556b72a89e360000000000fdffffff021027000000000000160014641625461c815dcb5989ff044cf0233838e84210e6e65d5f000000001600148d879a97d33dd2757b3c8ddc83ca89435e18f25c02483045022100a11bd1c16b87caf894fb1baf098216122883565987db4e1dd28bab6a83436c7f02206c633cfaced303ba8ceb06e0fa2d3c248b9f61d9691f772e62ab99c04dfe35e301210304731a7723c3f1802e6b51325d05d3fc0f954d78bf00d334cdba582dcd32a8b500000000000000"
    const signResult = await signTransaction({
      hex,
    })
    console.log("===== SIGN RESULT EXAMPLE ======", signResult)
    setSignedHex(signResult.result.signedHex)
  }
  const sendTransactions = async () => {
    const sendResult = await sendTransaction({
      hex: signedHex,
    })
    console.log("===== SEND RESULT EXAMPLE ======", sendResult)
  }
  const signAndSendTransactions = async () => {
    const hex =
      "70736274ff0100710200000001f0b9e542909b19b2257aac1029864db4838848cbff64168492f81d325a4c20510100000000fdffffff0200c2eb0b00000000160014641625461c815dcb5989ff044cf0233838e842105924725300000000160014758693f2a304ee9c3ba3934911a89761e730b4e100000000000100df020000000001017fead90885ab9be45e1f61ef34718b9d26b9421ae6428400d5b8556b72a89e360000000000fdffffff021027000000000000160014641625461c815dcb5989ff044cf0233838e84210e6e65d5f000000001600148d879a97d33dd2757b3c8ddc83ca89435e18f25c02483045022100a11bd1c16b87caf894fb1baf098216122883565987db4e1dd28bab6a83436c7f02206c633cfaced303ba8ceb06e0fa2d3c248b9f61d9691f772e62ab99c04dfe35e301210304731a7723c3f1802e6b51325d05d3fc0f954d78bf00d334cdba582dcd32a8b500000000000000"
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
            <div>
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
            </div>
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
