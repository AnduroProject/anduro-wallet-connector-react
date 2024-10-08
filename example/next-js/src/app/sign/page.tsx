"use client"
import React from "react"
import { useConnector } from "anduro-wallet-connector-react"
export default function SignVC() {
  const { sign } = React.useContext<any>(useConnector)
  const [message, setMessage] = React.useState<any>("")

  const handleSignFormSubmit = async (event: any) => {
    event.preventDefault()
    const result = await sign({
      message: message,
    })
    console.log("*******Sign Result", result)
  }
  return (
    <div>
      <div className="widset_parent">
        <h3 className="title">Sign</h3>
        <div>
          <form onSubmit={handleSignFormSubmit}>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-5">
                <div className="label-text-align">
                  <label htmlFor="message">Message :</label>
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-7">
                <div className="input_padd">
                  <input
                    id="message"
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
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
