# anduro-wallet-connector

Anduro Wallet Connector is a React library that will enable users to easily connect to the Anduro Wallet browser extension. This library includes the below options:

- Connect
- Disconnect
- Send transaction ( BTC & CBTC )
- Asset transfer
- Convert ( BTC to CBTC )
- Convert ( CBTC to BTC)
- Sign
- Sign transaction
- Send transaction
- Sign and send transaction
- Send Alys transaction

## Examples

See our [Examples](https://github.com/AnduroProject/anduro-wallet-connector-react/tree/main/example) for anduro wallet connector react library integration and
implementations.

- [React Example](https://github.com/AnduroProject/anduro-wallet-connector-react/tree/main/example/react)
- [Next.js Example](https://github.com/AnduroProject/anduro-wallet-connector-react/tree/main/example/next-js)

## Before running example, please follow below things.

Install the Anduro Wallet Chrome extension from the Chrome web store. - https://chromewebstore.google.com/detail/anduro-wallet/khebhoaoppjeidmdkpdglmlhghnooijn

## Installing example app

- go to example folder and run below command
  ```bash
  npm install
  ```

## Usage

Initialize Anduro Wallet Connector:

```bash
import { UseConnectorProvider } from 'anduro-wallet-connector';
import React from 'react';

function App () {
  return (
    <UseConnectorProvider/>
  );
}
```

we will use the <UseConnectorProvider /> component to connect anduro wallet extension.

### 1. Connect Anduro Wallet

Connect Anduro wallet using connect function.

**Parameter**

chainId: 1 or 2 or 3 or 4 or 5 or 6

- 1 for Bitcoin mainnet
- 2 for Sidechain mainnet
- 3 for Alys mainnet
- 4 for Bitcoin testnet
- 5 for Sidechain testnet
- 6 for Alys testnet

```bash
import React from 'react';
const { connect } = React.useContext<any>(useConnector);

const handleConnectResponse = async () => {
  const result = await connect({
   chainId
  })
}
```

### 2. Disconnect Anduro Wallet

Disconnect Anduro wallet using disconnect function.

```bash
import React from 'react';
const { disconnect } = React.useContext<any>(useConnector);

const handleDisConnectResponse = async () => {
  const result = await disconnect()
}
```

### 3. Transfer Asset

Create Asset transfer in anduro wallet using transfer asset function

**Parameters**

assetId: The asset ID \
receiverAddress: Receiver Address \
supply: supply to transfer

```bash
import { useConnector } from 'anduro-wallet-connector';
import React from 'react';

const { transferasset } = React.useContext<any>(useConnector);

const handleTransferFunction = async () => {
  const result = await transferasset({
    assetId: 1,
    receiverAddress: "ccrt1qy6302x6qm8084tfwuf2hagfe8ndvpevg3u5n2j",
    supply: 10,
  })
}
```

### 4. Network and wallet informations

We provide network and wallet information

```bash
import { useConnector } from 'anduro-wallet-connector';
import React from 'react';

const { networkState, walletState } = React.useContext<any>(useConnector);
```

### 5. Send / Convert ( BTC and CBTC )

**Parameters**

transactionType:\
1.normal - Send BTC / CBTC \
2.pegin - Convert BTC to CBTC \
3.pegout - Convert CBTC to BTC\
amount: transaction amount\
receiverAddress: (Optional) Receiver address ( Sidechain address / bitcoin address )\
feeRate: (Optional) Fee rate per virtual byte

```bash
import { useConnector } from 'anduro-wallet-connector';
import React from 'react';

const { send } = React.useContext<any>(useConnector);
const handleSendAction = async () => {
  const params = {
      transactionType: "normal",
      amount: 1,
      receiverAddress: "ccrt1qy6302x6qm8084tfwuf2hagfe8ndvpevg3u5n2j",
      feeRate: 1,
    }
    const result = await send(params);
}
```

### 6. Sign Message

Sign Anduro wallet using sign function.

**Parameter**

message: Message

```bash
import React from 'react';
const { sign } = React.useContext<any>(useConnector);

const handleConnectResponse = async () => {
  const result = await sign({
   message: "sign message"
  })
}
```

### 7. Sign Transactions

Sign the PSBT raw hex using the signTransaction function.

**Parameter**

hex: PSBT raw hex

```bash
import React from 'react';
const { signTransaction } = React.useContext<any>(useConnector);
const [rawHex, setRawHex] = React.useState<string>("");

  const signTransactions = async () => {
    const signResult = await signTransaction({
      hex: rawHex,
    })
    console.log("===== SIGN RESULT EXAMPLE ======", signResult)
    if (signResult.status) {
      setSignedHex(signResult.result.signedHex)
    }
  }
```

### 8. Send Transactions

Send a signed PSBT hex to the connected chain using the sendTransaction function.

**Parameter**

hex: PSBT signed hex
type: normal OR premium

```bash
import React from 'react';
const { sendTransaction } = React.useContext<any>(useConnector);
const [signedHex, setSignedHex] = React.useState<string>("")

  const sendTransactions = async (type: string) => {
    const sendResult = await sendTransaction({
      hex: signedHex,
      transactionType: type,
    })
    console.log("===== SEND RESULT EXAMPLE ======", sendResult)
  }
```

### 9. Sign And Send Transactions

Sign and send a transaction to the connected chain using the signAndSendTransaction function.

**Parameter**

hex: PSBT raw hex
type: normal OR premium

```bash
import React from 'react';
const { signAndSendTransaction } = React.useContext<any>(useConnector);
const [rawHex, setRawHex] = React.useState<string>("");

  const signAndSendTransactions = async (type: string) => {
    const transactionResult = await signAndSendTransaction({
      hex: rawHex,
      transactionType: type,
    })
    console.log("===== SIGN AND SEND TRANSACTION RESULT EXAMPLE ======", transactionResult)
  }
```

### 10. Send Alys transaction

Send Alys Transaction to be connected chain using the send Alys Transaction function .

**Parameter**

hex: PSBT raw hex

```bash
import React from 'react';
const { sendAlys } = React.useContext<any>(useConnector);
const {unsignedHex, setUnsignedHex} = React.useState<string>("")
  const sendAlys = async () => {
    const hex = unsignedHex
    const transactionResult = await sendAlys({
      hex,
    })
  }
```

### 11. Sign Message

Sign Message to get hex .

**Parameter**

message: string

```bash
import React from 'react';
const { sign } = React.useContext<any>(useConnector);
const {message, setMessage} = React.useState<string>("")
  const sendAlys = async () => {
    const hex = message
    const signResult = await sign({
      hex,
    })
  }
```
