"use client"
import React from "react"
import { useConnector } from "anduro-wallet-connector"
export default function SendVC() {
  const { send } = React.useContext<any>(useConnector)
  const [amount, setAmount] = React.useState<any>("")
  const [receiverAddress, setReceiverAddress] = React.useState<any>("")
  const [feerate, setFeerate] = React.useState<any>("")
  const [sendType, setSendType] = React.useState<any>("normal")

  const handleSendFormSubmit = async (event: any) => {
    event.preventDefault()
    const result = await send({
      transactionType: sendType,
      amount: amount,
      receiverAddress: receiverAddress,
      feeRate: feerate,
    })
    console.log("*******Send Transaction Result", result)
  }
  return (
    <div>
      <div className="widset_parent">
        <h3 className="title">Create {sendType}</h3>
        <div>
          <form onSubmit={handleSendFormSubmit}>
            <div className="input_padd">
              <select onChange={(event) => setSendType(event.target.value)}>
                <option value="normal">Normal</option>
                <option value="pegin">PegIn</option>
                <option value="pegout">PegOut</option>
              </select>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-5">
                <div className="label-text-align">
                  <label htmlFor="amount">Amount : *</label>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-7">
                <div className="input_padd">
                  <input
                    id="amount"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-5">
                <div className="label-text-align">
                  <label htmlFor="receiver_address">Receiver Address :</label>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-7">
                <div className="input_padd">
                  <input
                    id="receiver_address"
                    type="text"
                    placeholder="Receiver Address"
                    value={receiverAddress}
                    onChange={(event) => setReceiverAddress(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-5">
                <div className="label-text-align">
                  <label htmlFor="feerate">Fee rate (VB) :</label>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-7">
                <div className="input_padd">
                  <input
                    id="feerate"
                    type="number"
                    placeholder="Fee rate (VB)"
                    value={feerate}
                    onChange={(event) => setFeerate(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btnsubmit">
              {sendType}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
