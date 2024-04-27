"use client"

import { UseConnectorProvider } from "anduro-wallet-connector"
import { WALLETURL } from "../config/config"

UseConnectorProvider
export default function WalletConnect(props: any) {
  return (
    <>
      <UseConnectorProvider walletURL={WALLETURL}>{props.children}</UseConnectorProvider>
    </>
  )
}
