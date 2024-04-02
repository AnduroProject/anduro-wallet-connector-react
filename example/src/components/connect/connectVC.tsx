import React, { useContext } from 'react';
import { ConnectorVW } from '../../UI/connectorVW';
import { useConnector } from "anduro-wallet-connector"
import { Link } from 'react-router-dom';
export const ConnectorVC = () => {
  const {networkState, walletState, connect, disconnect, send, createasset, transferasset} = React.useContext<any>(useConnector)
  // const {connect, disconnect, getNetworkInformation, send, createasset, transferasset, getWalletInformation} = useConnector({walletUrl: "http://localhost:5002"})
  const handleConnectionAction = async () => {
    const result = await connect({
      chainId: 2,
      onComplete: handleConnectionCallback,
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
  }, [])
  const handleConnectionCallback = (event: any) => {
    // console.log("Connection Callback", event)
  }
  return (
    <div>
      {walletState.accountPublicKey === "" && (
        <ConnectorVW title="Connect wallet" buttonName="Connect" handleClickAction={handleConnectionAction} />
      )}
      {walletState.accountPublicKey !== "" && (
        <div>
          <div className='display-flex'>
            <Link to="/send">Send</Link>
          </div>
          <div className='display-flex'>
            <Link to="/createasset">Create Asset</Link>
          </div>
          <div className='display-flex'>
            <Link to="/transfer">Transfer</Link>
          </div>
          <ConnectorVW title="Disconnect Wallet" buttonName="Disconnect" handleClickAction={disconnect} />
        </div>
      )}
    </div>
  );
}
