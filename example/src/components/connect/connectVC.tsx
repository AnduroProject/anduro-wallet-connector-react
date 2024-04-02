import React, { useContext } from 'react';
import { useConnector } from 'anduro-wallet-connecter/dist'
import { ConnectorVW } from '../../UI/connectorVW';
import { Link } from 'react-router-dom';
export const ConnectorVC = () => {
  const {getNetworkInformation, getWalletInformation, connect, disconnect, send, createasset, transferasset} = React.useContext<any>(useConnector)
  // const {connect, disconnect, getNetworkInformation, send, createasset, transferasset, getWalletInformation} = useConnector({walletUrl: "http://localhost:5002"})
  const handleConnectionAction = () => {
    connect({
      chainId: 2,
      onComplete: handleConnectionCallback,
    })
  }
  React.useEffect(() => {
    console.log("Connector Network Information", getNetworkInformation())
    console.log("Connector Wallet Information", getWalletInformation())
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
