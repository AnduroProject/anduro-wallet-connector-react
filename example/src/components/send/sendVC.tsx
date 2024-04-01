import React from 'react';
import { useConnector } from 'anduro-wallet-connecter/dist'
export const SendVC = () => {
  // for send
  const [amount, setAmount] = React.useState<any>("")
  const [receiverAddress, setReceiverAddress] = React.useState<any>("")
  const [feerate, setFeerate] = React.useState<any>("")
  const [sendType, setSendType] = React.useState<any>("normal")


  const {getNetworkInformation, send, getWalletInformation} = useConnector({walletUrl: "http://localhost:5002"})
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
  const handleTransferCallback = (event: any) => {
    // console.log("Tranfer Event", event)
    console.log("SEND Network Information", getNetworkInformation())
    console.log("SEND Wallet Information", getWalletInformation())
  }
  return (
    <div>
      <div className="widset_parent">
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
      </div>
    </div>
  );
}
