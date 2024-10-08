import React from "react"
import { useConnector } from "anduro-wallet-connector-react"
export const CreateAssetVC = () => {
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
  const [precision, setPrecision] = React.useState<any>(8)

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
      precision,
    })
    console.log("*******Create and Mint asset Result", result)
  }
  const handleAssetTypeSwitch = (value: any) => {
    setCreateAssetTransactionType(value)
    setAssetType(0)
  }
  return (
    <div className="widset_parent">
      <h3 className="title">{createAssetTransactionType} Asset</h3>
      <div>
        <form onSubmit={handleCreateAssetFormSubmit}>
          <div className="input_padd">
            <select onChange={(event) => handleAssetTypeSwitch(event.target.value)}>
              <option value="create">Create</option>
              <option value="mint">Mint</option>
            </select>
          </div>
          {createAssetTransactionType === "create" && (
            <div>
              <div className="input_padd">
                <select onChange={(event) => setAssetType(parseInt(event.target.value))}>
                  <option value={0}>0 Token</option>
                  <option value={1}>1 NFT</option>
                </select>
              </div>
              <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-5">
                  <div className="label-text-align">
                    <label htmlFor="name">Name :</label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7">
                  <div className="input_padd">
                    <input
                      id="name"
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
                    <label htmlFor="symbol">Symbol :</label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7">
                  <div className="input_padd">
                    <input
                      id="symbol"
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
                    <label htmlFor="image_url">Image URL :</label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-7">
                  <div className="input_padd">
                    <input
                      id="image_url"
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
            </>
          )}
          {assetType === 0 && createAssetTransactionType !== "mint" && (
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-5">
                <div className="label-text-align">
                  <label htmlFor="supply">Decimal :</label>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-7">
                <div className="input_padd">
                  <input
                    id="supply"
                    type="text"
                    placeholder="Supply"
                    value={precision}
                    onChange={(event) => setPrecision(event.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
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
          {createAssetTransactionType !== "create" && (
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
          )}
          <button type="submit" className="btnsubmit">
            {createAssetTransactionType}
          </button>
        </form>
      </div>
    </div>
  )
}
