import React from 'react';
import './App.css';
import { useConnector } from 'anduro-wallet-connecter/dist'
function App() {
  // for send
  const [amount, setAmount] = React.useState<any>("")
  const [receiverAddress, setReceiverAddress] = React.useState<any>("")
  const [feerate, setFeerate] = React.useState<any>("")
  const [sendType, setSendType] = React.useState<any>("normal")
  // for asset
  const [name, setName] = React.useState<string>("")
  const [symbol, setSymbol] = React.useState<string>("")
  const [imageUrl, setImageUrl] = React.useState<string>("")
  const [supply, setSupply] = React.useState<any>("")
  const [properties, setProperties] = React.useState<any>([{type: "#1 Type", value: "#1 Value"}])
  const [assetType, setAssetType] = React.useState<any>(0)
  const [createAssetTransactionType, setCreateAssetTransactionType] = React.useState<string>("create")
  const [assetId, setAssetId] = React.useState<number>(0)


  const {connect, disconnect, getNetworkInformation, send, createasset, transferasset, getWalletInformation} = useConnector({walletUrl: "http://localhost:5002"})
  const handleSendFormSubmit = (event: any) => {
    event.preventDefault()
    console.log("-transactionType", sendType)
    let params = {
      transactionType: sendType,
      amount: amount,
      receiverAddress: receiverAddress,
      feeRate: feerate,
      onComplete: handleTransferCallback,
    }
    send(params)
  }
  const handleCreateAssetFormSubmit = (event: any) => {
    event.preventDefault()
    if (createAssetTransactionType === "transfer") {
      transferasset({
        assetId,
        receiverAddress,
        supply,
        onComplete: handleTransferAssetCallback,
      })
    } else {
      createasset({
        name,
        symbol,
        imageUrl,
        supply,
        properties,
        assetType,
        transactionType: createAssetTransactionType,
        onComplete: handleCreateAssetCallback,
        receiverAddress,
        assetId,
      })
    }
  }
  const handleCreateAssetCallback = (event: any) => {
    console.log("Create Asset Event", event)
  }
  const handleTransferAssetCallback = (event: any) => {
    console.log("Transfer Asset Event", event)
  }
  const handleTransferCallback = (event: any) => {
    console.log("Tranfer Event", event)
  }
  const handleConnectionAction = () => {
    connect({
      chainId: 2,
      onComplete: handleConnectionCallback,
    })
  }
  const handleConnectionCallback = (event: any) => {
    console.log("Connection Callback", event)
  }
  return (
    <div>
      <div className="widset_parent">
        <div className='addpadding'>
          <h3 className='title'>Connect wallet</h3>
          <button className='btnsubmit' onClick={handleConnectionAction} >Connect</button>
        </div>
        <div className='addpadding'>
          <h3 className='title'>Disconnect Wallet</h3>
          <button className='btnsubmit' onClick={disconnect} >Disconnect</button>
        </div>
        <h3 className='title'>Create {sendType}</h3>
        <div>
          <form onSubmit={handleSendFormSubmit}>
          <div className='input_padd'>
            <select onChange={(event) => setSendType(event.target.value)}>
              <option value="normal">Normal</option>
              <option value="pegin">PegIn</option>
              <option value="pegout">PegOut</option>
            </select>
          </div>
          <div className='display-flex'>
            <div className='label-text-align'>
              <label>Amount : *</label>
            </div>
            <div className='input_padd'>
              <input type="number" placeholder='Amount' value={amount} onChange={(event) => setAmount(event.target.value)}/>
            </div>
          </div>
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
              <label>Fee rate (VB) :</label>
            </div>
            <div className='input_padd'>
              <input type="number" placeholder='Fee rate (VB)' value={feerate} onChange={(event) => setFeerate(event.target.value)}/>
            </div>
          </div>
            <button type='submit' className='btnsubmit'>{sendType}</button>
          </form>
        </div>
        <h3 className='title'>{createAssetTransactionType} Asset</h3>
        <div>
          <form onSubmit={handleCreateAssetFormSubmit}>
            <div className='input_padd'>
              <select onChange={(event) => setCreateAssetTransactionType(event.target.value)}>
                <option value="create">Create</option>
                <option value="transfer">Transfer</option>
                <option value="mint">Mint</option>
              </select>
            </div>
            {createAssetTransactionType === "create" &&(
              <div>
                <div className='input_padd'>
                  <select onChange={(event) => setAssetType(event.target.value)}>
                    <option value={0}>0 Token</option>
                    <option value={1}>1 NFT</option>
                  </select>
                </div>
                <div className='display-flex'>
                  <div className='label-text-align'>
                    <label>Name :</label>
                  </div>
                  <div className='input_padd'>
                    <input type="text" placeholder='Name' value={name} onChange={(event) => setName(event.target.value)}/>
                  </div>
                </div>
                <div className='display-flex'>
                  <div className='label-text-align'>
                    <label>Symbol :</label>
                  </div>
                  <div className='input_padd'>
                    <input type="text" placeholder='Symbol' value={symbol} onChange={(event) => setSymbol(event.target.value)}/>
                  </div>
                </div>
                <div className='display-flex'>
                  <div className='label-text-align'>
                    <label>Image URL :</label>
                  </div>
                  <div className='input_padd'>
                    <input type="text" placeholder='Image URL' value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}/>
                  </div>
                </div>
              </div>
            )}
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
            {createAssetTransactionType !== "create" && (
              <div>
                <div className='display-flex'>
                  <div className='label-text-align'>
                    <label>Asset ID : *</label>
                  </div>
                  <div className='input_padd'>
                    <input type="number" placeholder='Asset ID' value={assetId} onChange={(event) => setAssetId(parseInt(event.target.value))}/>
                  </div>
                </div>
              </div>
            )}
            <button type='submit' className='btnsubmit'>{createAssetTransactionType}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
