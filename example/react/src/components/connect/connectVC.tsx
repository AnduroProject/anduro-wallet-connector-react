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
      "70736274ff01007102000000015fd85295564d3b8c631dc047f6669f4b5c21b889ea79cc768c0ac3214f7c00d70000000000fdffffff020084d71700000000160014bbee98bf44950b31dc0a92d4a29b72f032cd25147345c323000000001600148d879a97d33dd2757b3c8ddc83ca89435e18f25c00000000000100fd7201020000000001028fd098b4a287bde0782f0767141ac1b350088cb6b9a871fb99d0d75d03f3f8b80000000000fdffffff1fad673e6c9f4fde1d9dae8e70f88f64e9b3cc744282a07f287fb0df0fcacdb30000000000fdffffff0200ca9a3b00000000160014f002496bf10d148c32d798cfac94b0e05b26b54d60aae60e0000000016001440d432dec91830f05eb10bc90dac98b4d36d23d80247304402206e7dd06a39f78ac1714cd6e67e5ef215dff71adbdc64c91d083401881d986c1a02204d5765f316912738e21edd59ef3bdfa8a37d863414be3fc58cf82b673572483b01210278e0d1eda921524e51f8c9cdb17895b5f385f51e7a40bcee1ec1f396d455fb9e0247304402202d5efa020507bb6d67c93377508bc79169367afe0c8d9224b6dcbae25e240aee02205beffe466aae08f09af2ee732c02246ad39cfbbd386cc5a12cb192062203115f01210278e0d1eda921524e51f8c9cdb17895b5f385f51e7a40bcee1ec1f396d455fb9ed8010000000000"
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
