"use client";
import React from "react"
import { useConnector } from "anduro-wallet-connector"
export default function CreateAssetVC(){
  const { createasset } = React.useContext<any>(useConnector)
  const [receiverAddress, setReceiverAddress] = React.useState<any>("")

  const [name, setName] = React.useState<string>("")
  const [symbol, setSymbol] = React.useState<string>("")
  const [imageUrl, setImageUrl] = React.useState<string>("")
  const [supply, setSupply] = React.useState<any>("")
  const [properties] = React.useState<any>([{ type: "#1 Type", value: "#1 Value" }])
  const [assetType, setAssetType] = React.useState<any>(0)
  const [createAssetTransactionType, setCreateAssetTransactionType] =
    React.useState<string>("create")
  const [assetId, setAssetId] = React.useState<number>(0)

  const handleCreateAssetFormSubmit = async (event: any) => {
    event.preventDefault()
    const result = await createasset({
      name,
      symbol,
      imageUrl,
      supply,
      properties,
      assetType,
      transactionType: createAssetTransactionType,
      receiverAddress,
      assetId,
    })
    console.log("*******Create and Mint asset Result", result)
  }
  return (
    <div className="widset_parent">
      <h3 className="title">{createAssetTransactionType} Asset</h3>
      <div>
        <form onSubmit={handleCreateAssetFormSubmit}>
          <div className="input_padd">
            <select onChange={(event) => setCreateAssetTransactionType(event.target.value)}>
              <option value="create">Create</option>
              <option value="mint">Mint</option>
            </select>
          </div>
          {createAssetTransactionType === "create" && (
            <div>
              <div className="input_padd">
                <select onChange={(event) => setAssetType(event.target.value)}>
                  <option value={0}>0 Token</option>
                  <option value={1}>1 NFT</option>
                </select>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-5">
                  <div className="label-text-align">
                    <label>Name :</label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7">
                  <div className="input_padd">
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-5">
                  <div className="label-text-align">
                    <label>Symbol :</label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7">
                  <div className="input_padd">
                    <input
                      type="text"
                      placeholder="Symbol"
                      value={symbol}
                      onChange={(event) => setSymbol(event.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-5">
                  <div className="label-text-align">
                    <label>Image URL :</label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7">
                  <div className="input_padd">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={imageUrl}
                      onChange={(event) => setImageUrl(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {createAssetTransactionType !== "create" && (
            <>
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-5">
                  <div className="label-text-align">
                    <label>Receiver Address :</label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7">
                  <div className="input_padd">
                    <input
                      type="text"
                      placeholder="Receiver Address"
                      value={receiverAddress}
                      onChange={(event) => setReceiverAddress(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-5">
              <div className="label-text-align">
                <label>Supply :</label>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-7">
              <div className="input_padd">
                <input
                  type="text"
                  placeholder="Supply"
                  value={supply}
                  onChange={(event) => setSupply(event.target.value)}
                />
              </div>
            </div>
          </div>
          {createAssetTransactionType !== "create" && (
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-5">
                <div className="label-text-align">
                  <label>Asset ID : *</label>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-7">
                <div className="input_padd">
                  <input
                    type="number"
                    placeholder="Asset ID"
                    value={assetId}
                    onChange={(event) => setAssetId(parseInt(event.target.value))}
                  />
                </div>
              </div>
            </div>
          )}
          <button type="submit" className="btnsubmit">
            {createAssetTransactionType}
          </button>
        </form>
      </div>
    </div>
  )
}
