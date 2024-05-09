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
    if (networkState.chainId) {
      console.log("networkState.chainId", networkState.chainId)
      signTransactions()
    }
  }, [walletState, networkState])

  const signTransactions = async () => {
    const hex =
      "70736274ff0100710200000001768836234ae0d28d8ad8ee013f7ea9768f5cd34b8120bffa26a2b5f18489368d0100000000fdffffff0200a3e11100000000160014e75b6b71d89cdd2b7e799de080d211c940bacd6c7326b92900000000160014bdb1ca0b2528347e92e2495bac93a56b013cd5c200000000000100fd720102000000000102ca0dbc669b185fe8840b3c576d05c0b6253e23a34bdc4d298757776aa9ae382a0000000000fdffffff09d5ff1ed473844c43d899917ff6fa6a35de7678e20555a7bba4beb71a3c30d40000000000fdffffff024058ee00000000001600148f4df1f8b26e8e43ce12cf21f55b1f8202b53d9f00ca9a3b000000001600145d969d3349963dcb347e55e36ba8316fe95b95040247304402206e122750788b94bd61e54a74349f477e5b563e07acd04b1a818ae3210bfdbc70022060df991b7a3567b8558e098bd14b3deb2d759b009daabe35c5c7cc85269d6fbc0121037372fb9e6c433173764a2fd1d0abb325284da702c7e1e74e5e7e10ad58243934024730440220104eb86323bcb0cf6a39990f484779408803a14548a5a34ec5741a9a04fa6a860220584e9cae3076924dd834206b2493c8185078b206ce36efb09ba76926bb5935c101210244648e38a4514e275a394a7609e0b044ca616fea56ec9c1e21bf17f2308a1d6db3040000000000"
    const signResult = await signTransaction({
      hex,
    })
    console.log("===== SIGN RESULT EXAMPLE ======", signResult)
    sendTransactions(signResult.result.signedHex)
  }
  const sendTransactions = async (signedHex: string) => {
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
