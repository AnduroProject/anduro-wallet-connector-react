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
      "70736274ff01007102000000014a0575808b77bc99eba3992827e049db48cddeb080ad0a2b849b556ac77421d50100000000fdffffff0200e1f50500000000160014bbee98bf44950b31dc0a92d4a29b72f032cd2514e644c323000000001600148d879a97d33dd2757b3c8ddc83ca89435e18f25c00000000000100de02000000000101ebfa8c87564cd4bbb7fed9c4933e0c850acd102e6c541c6c8370241d5923fd790100000000fdffffff0200a3e11100000000160014bbee98bf44950b31dc0a92d4a29b72f032cd25147326b929000000001600148d879a97d33dd2757b3c8ddc83ca89435e18f25c0247304402202cfb0fd5b3610a264a89a39947bbd04b0decf90a01f10614281f083cf0c7c3bb022057b17a6bdee49fdee0868d93a279f35959b5584eb7458db5e1f451b78cfaff5e012102c1c448c689a79ab73bc07cb2b524bbf7a2a4c2a7fdc3eb3b839b025cda45b72100000000000000"
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
      "70736274ff0100710200000001abfbb20b7564d709e84497a704dbddb42b0e2f925aa4c5431a86d7ffb64d72370100000000fdffffff0200c2eb0b00000000160014bbee98bf44950b31dc0a92d4a29b72f032cd2514e682d717000000001600148d879a97d33dd2757b3c8ddc83ca89435e18f25c00000000000100df020000000001015fd85295564d3b8c631dc047f6669f4b5c21b889ea79cc768c0ac3214f7c00d70000000000fdffffff020084d71700000000160014bbee98bf44950b31dc0a92d4a29b72f032cd25147345c323000000001600148d879a97d33dd2757b3c8ddc83ca89435e18f25c024830450221009c205fe8b64ff75571ca9a2bacd0b0d565d9319ced853be0a76b19979724297f02204ad6e68b8b4231297b770dafd53ada9ed13dcd5451f28441c00e1bc6203ae930012102c1c448c689a79ab73bc07cb2b524bbf7a2a4c2a7fdc3eb3b839b025cda45b72100000000000000"
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
