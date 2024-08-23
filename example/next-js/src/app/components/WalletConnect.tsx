"use client"

import { UseConnectorProvider } from "anduro-wallet-connector-react"

export default function WalletConnect(props: any) {
  return (
    <>
      <UseConnectorProvider>{props.children}</UseConnectorProvider>
    </>
  )
}
