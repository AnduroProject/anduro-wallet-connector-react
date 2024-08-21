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
  const handleConnectionAction = async () => {
    const result = await connect({
      chainId: 3,
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
      "70736274ff01007102000000010b19d8363aa4026390d46e49b4c454da11e16d3af5a1a40cbc517f53a95e90870000000000fdffffff0200e1f50500000000160014eb21c968ebba6d2f4b651969fde78434090fc8bdecb1a43500000000160014a868c2c1d0b209ed561b714eee1e0a0c08d5737a00000000000100de02000000000101c7529142d68f990302a65922d3f8fbccae4a0fcea9aaae42d43a8eebb3f3d42c0000000000fdffffff0200ca9a3b00000000160014548a63aea10446588b59868a68f87343cde6586e5b7be60e00000000160014a2e2fab26c3a24c64bb94e4405896c1f311fcc1302473044022047777dd71ff26babb3eeab67db31f1191bd3c38596617977c5b4599130e9bf3302203a91fe0db726aaabaa85664731e448e9da90d5c8b544b6907244d631c63e4b770121031ba6b86cdfd45a5f10cbd2c76063cb64ad773bd6760ead1487fbf6377f208bd0b7060000000000"
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
      "70736274ff01007102000000015e6d75cc8e6fb4b307bfb880262e186538ae103c131634bbebf26dcdd68f1a930100000000fdffffff020065cd1d00000000160014eb21c968ebba6d2f4b651969fde78434090fc8bdec2dcd1d00000000160014a868c2c1d0b209ed561b714eee1e0a0c08d5737a00000000000100de02000000000101f026669f3cfbef1168b9393074f35b3c165530070a2b522ef22c3f42cd7967410000000000fdffffff02dbf76759000000001600149c7b72d8b076c382bbc23d0aa4b6d10832d6665800ca9a3b00000000160014548a63aea10446588b59868a68f87343cde6586e0247304402206c3b60c6461ef3d24a1d8b09caf25a56cc474638cfc983c3ea7fc00043b7e7cf022025894d45aea71fe9e9595ce9ecfd5c8bb89dd205874d4d3b1220f364d48f2c1b0121031ba6b86cdfd45a5f10cbd2c76063cb64ad773bd6760ead1487fbf6377f208bd0b7060000000000"
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
            {/* <div className="breadcrumb">
              <Link to="/createasset">Create Asset</Link>
            </div> */}
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
