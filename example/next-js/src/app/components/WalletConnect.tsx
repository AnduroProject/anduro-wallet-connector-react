"use client"

import { UseConnectorProvider } from "anduro-wallet-connector"

export default function WalletConnect(props: any) {
  return (
    <>
      <UseConnectorProvider>{props.children}</UseConnectorProvider>
    </>
  )
}
