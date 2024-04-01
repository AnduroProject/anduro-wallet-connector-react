import React from 'react';
import { useConnector } from 'anduro-wallet-connecter/dist'
export const TransferAssetVC = () => {
  const [supply, setSupply] = React.useState<any>("")
  const [assetId, setAssetId] = React.useState<number>(0)
  const [receiverAddress, setReceiverAddress] = React.useState("")


  const {getNetworkInformation, transferasset, getWalletInformation} = useConnector({walletUrl: "http://localhost:5002"})
  const handleCreateAssetFormSubmit = (event: any) => {
    event.preventDefault()
    transferasset({
        assetId,
        receiverAddress,
        supply,
        onComplete: handleTransferAssetCallback,
    })
  }
  const handleTransferAssetCallback = (event: any) => {
    // console.log("Transfer Asset Event", event)
    console.log("Transfer Network Information", getNetworkInformation())
    console.log("Transfer Wallet Information", getWalletInformation())
  }
  return (
    <div>
      <div className="widset_parent">
        <h3 className='title'>Transfer Asset</h3>
        <div>
          <form onSubmit={handleCreateAssetFormSubmit}>
            <div className='display-flex'>
              <div className='label-text-align'>
                <label>Receiver Address :</label>
              </div>
              <div className='input_padd'>
                <input type="text" placeholder='Receiver Address' value={receiverAddress} onChange={(event) => setReceiverAddress(event.target.value)}/>
              </div>
            </div>
            <div className='display-flex'>
              <div className='label-text-align'>
                <label>Supply :</label>
              </div>
              <div className='input_padd'>
                <input type="text" placeholder='Supply' value={supply} onChange={(event) => setSupply(event.target.value)}/>
              </div>
            </div>
            <div className='display-flex'>
                <div className='label-text-align'>
                    <label>Asset ID : *</label>
                </div>
                <div className='input_padd'>
                    <input type="number" placeholder='Asset ID' value={assetId} onChange={(event) => setAssetId(parseInt(event.target.value))}/>
                </div>
            </div>
            <button type='submit' className='btnsubmit'>Transfer</button>
          </form>
        </div>
      </div>
    </div>
  );
}
