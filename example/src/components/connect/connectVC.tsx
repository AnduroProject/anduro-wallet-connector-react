import React, { useContext } from 'react';
import { ConnectorVW } from '../../UI/connectorVW';
import { useConnector } from "anduro-wallet-connector"
import { Link } from 'react-router-dom';
export const ConnectorVC = () => {
  const {getNetworkInformation, walletState, connect, disconnect, send, createasset, transferasset} = React.useContext<any>(useConnector)
  // const {connect, disconnect, getNetworkInformation, send, createasset, transferasset, getWalletInformation} = useConnector({walletUrl: "http://localhost:5002"})
  const handleConnectionAction = () => {
    connect({
      chainId: 2,
      onComplete: handleConnectionCallback,
    })
  }
  React.useEffect(() => {
    console.log("Connector Network Information", getNetworkInformation())
  }, [])
  const handleConnectionCallback = (event: any) => {
    // console.log("Connection Callback", event)
  }
  return (
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
        <ConnectorVW title="Connect wallet" buttonName="Connect" handleClickAction={handleConnectionAction} />
        <ConnectorVW title="Disconnect Wallet" buttonName="Disconnect" handleClickAction={disconnect} />
    </div>
  );
}
