"use client"
import React from "react"
import { useConnector } from "anduro-wallet-connector-react"
export const SendAlysVC = () => {
  const { signAlysTransaction } = React.useContext<any>(useConnector)
  const [transactionhex, setTransactionHex] = React.useState<string>("")

  const handleSignFormSubmit = async (event: any) => {
    event.preventDefault()
    const result = await signAlysTransaction({
      hex: transactionhex,
    })
    console.log("*******Sign Result", result)
  }
  return (
    <div>
      <div className="widset_parent">
        <h3 className="title">Send Alys</h3>
        <div>
          <form onSubmit={handleSignFormSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-5">
                <div className="label-text-align">
                  <label htmlFor="message">Transaction Hex :</label>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-7">
                <div className="input_padd">
                  <textarea
                    id="message"
                    // type="text"
                    placeholder="transaction hex"
                    value={transactionhex}
                    onChange={(event) => setTransactionHex(event.target.value)}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btnsubmit">
              Sign
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
