"use client"
import React from "react"
import { useConnector } from "anduro-wallet-connector-react"
export default function TransferAssetVC() {
  const { transferasset } = React.useContext<any>(useConnector)
  const [supply, setSupply] = React.useState<any>("")
  const [assetId, setAssetId] = React.useState<number>(0)
  const [receiverAddress, setReceiverAddress] = React.useState("")

  const handleFormSubmit = async (event: any) => {
    event.preventDefault()
    const result = await transferasset({
      assetId,
      receiverAddress,
      supply,
    })
    console.log("*******Transfer Asset Result", result)
  }
  return (
    <div className="widset_parent">
      <h3 className="title">Transfer Asset</h3>
      <div>
        <form onSubmit={handleFormSubmit}>
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
                <label htmlFor="supply">Supply :</label>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-7">
              <div className="input_padd">
                <input
                  id="supply"
                  type="text"
                  placeholder="Supply"
                  value={supply}
                  onChange={(event) => setSupply(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-5">
              <div className="label-text-align">
                <label htmlFor="asset_id">Asset ID : *</label>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-7">
              <div className="input_padd">
                <input
                  id="asset_id"
                  type="number"
                  placeholder="Asset ID"
                  value={assetId}
                  onChange={(event) => setAssetId(parseInt(event.target.value))}
                />
              </div>
            </div>
          </div>
          <button type="submit" className="btnsubmit">
            Transfer
          </button>
        </form>
      </div>
    </div>
  )
}
