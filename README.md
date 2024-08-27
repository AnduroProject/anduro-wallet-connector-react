# anduro-wallet-connector

Anduro Wallet Connector is a React library that will enable users to easily connect to the Anduro Wallet browser extension. This library includes the below options:

- Connect
- Disconnect
- NetworkInfo (initialize)
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

## Anduro Wallet supported Chains list

Please refer below table for supported chain list

| ID  | Chain        | Network Type |
| :-- | :----------- | :----------- |
| `1` | `Bitcoin`    | `mainnet`    |
| `2` | `Coordinate` | `mainnet`    |
| `3` | `Alys`       | `mainnet`    |
| `4` | `Bitcoin`    | `testnet`    |
| `5` | `Coordinate` | `testnet`    |
| `6` | `Alys`       | `testnet`    |

### 1. Connect Anduro Wallet

Connect Anduro wallet using connect function.

#### Request

```bash
import React from 'react';
const { connect } = React.useContext<any>(useConnector);

const handleConnectResponse = async () => {
  const result = await connect({
   chainId: 4,
  })
}
```

#### Request data types

| Parameter | Type     | Description                                                                      |
| :-------- | :------- | :------------------------------------------------------------------------------- |
| `chainId` | `number` | **Required**. Please refer to the to the supported chain list table for chainID. |

#### Response

```response
{
  error: null,
  result: "wallet connected successfully.",
  status: true
}
```

#### Response data types

| Parameter | Type             | Description                       |
| :-------- | :--------------- | :-------------------------------- |
| `error`   | `string OR null` | error for the connection request  |
| `result`  | `string OR null` | result for the connection request |
| `status`  | `boolean`        | status for the connection request |

### 2. Disconnect Anduro Wallet

Disconnect Anduro wallet using disconnect function.

#### Request

```bash
import React from 'react';
const { disconnect } = React.useContext<any>(useConnector);

const handleDisConnectResponse = async () => {
  const result = await disconnect()
}
```

#### Response

```response
{
  error: null,
  result: "The site has been removed.",
  status: true
}
```

#### Response data types

| Parameter | Type             | Description                       |
| :-------- | :--------------- | :-------------------------------- |
| `error`   | `string OR null` | error for the disconnect request  |
| `result`  | `string OR null` | result for the disconnect request |
| `status`  | `boolean`        | status for the disconnect request |

### 3. Get Network And Wallet Info

Get Anduro wallet network and wallet info using networkInfo function.

#### Request

```bash
import React from 'react';
const { networkInfo } = React.useContext<any>(useConnector);

const handleNetworkInfo = async () => {
  const result = await networkInfo()
}
```

#### Response

```response
{
error: null,
result: {chainId: 4, networkType: 'bitcoin', accountPublicKey: '0389aadab03634bea18eea715f86aed1a9e7282fb700965898089fe0d8e1a1e2fb', xpubKey: 'tpubDEL7N3DKtxLx5ZNpD9EWJcPWFRQBdzL7u9Y34N1CgwCyCW…xhdz13womU7fPsy8Cq8rLN2hAzUQxa5V2pYNskFPzpgic3Sfh', address: 'tb1qg9064fqm9wx6grja2j2us6szhg046hdzud9va6'},
status: true
}
```

#### Response data types

| Parameter | Type             | Description                        |
| :-------- | :--------------- | :--------------------------------- |
| `error`   | `string OR null` | error for the networkInfo request  |
| `result`  | `Object OR null` | result for the networkInfo request |
| `status`  | `boolean`        | status for the networkInfo request |

### 4. Transfer Asset

Create Asset transfer in anduro wallet using transfer asset function

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

#### Request data types

| Parameter         | Type     | Description                      |
| :---------------- | :------- | :------------------------------- |
| `assetId`         | `number` | **Required** . The asset ID      |
| `receiverAddress` | `string` | **Required**. Receiver Address   |
| `supply`          | `number` | **Required**. supply to transfer |

#### Response

```response
{
  error: null,
  result:
  {
    txid: "6857b38f0af87534d2ea03e871590cbdc7500ae1461ca416dc3ea7da56732797"
  },
  status: true
}
```

#### Response data types

| Parameter | Type             | Description                           |
| :-------- | :--------------- | :------------------------------------ |
| `error`   | `string OR null` | error for the asset transfer request  |
| `result`  | `Object OR null` | result for the asset transfer request |
| `status`  | `boolean`        | status for the asset transfer request |

### 5. Network and wallet informations

We provide network and wallet information

```bash
import { useConnector } from 'anduro-wallet-connector';
import React from 'react';

const { networkState, walletState } = React.useContext<any>(useConnector);
React.useEffect(() => {
    console.log("networkState", networkState)
    console.log("walletState", walletState)
  }, [networkState, walletState])
```

#### Response

```response
networkState: {chainId: 5, networkType: "sidechain"}
walletState: {"accountPublicKey":"03fb98b76e6fc5225a9e00bd56d2c1bf3949dbf09eef6226ed7a118afea45a55ec","connectionState":"connected","address":"tc1qan2zcgz6yr8hjfta5g7j2pzqtwk46rvrhr6g3g","accountXpubKey":"tpubDFHMqRPLjGpVigSDuPBVws3uBLyVducsu1SJb4KVGkWJdGiYu4jJJQKVR6D8BvBhT1wuMcXJtNbQ841txiZSGQFhnYcnxKrNeukaEA1wkPt"}
```

#### Network State Response data types

| Parameter     | Type             | Description          |
| :------------ | :--------------- | :------------------- |
| `chainId`     | `number OR null` | connected chain ID   |
| `networkType` | `string`         | connected chain type |

#### Wallet State Response data types

| Parameter          | Type     | Description                        |
| :----------------- | :------- | :--------------------------------- |
| `accountPublicKey` | `string` | connected chain account public key |
| `connectionState`  | `string` | connected status                   |
| `address`          | `string` | connected chain account address    |
| `accountXpubKey`   | `string` | connected chain xpub key address   |

### 6. Send / Convert ( BTC and CBTC )

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

#### Request data types

| Parameter         | Type     | Description                                                                                         |
| :---------------- | :------- | :-------------------------------------------------------------------------------------------------- |
| `transactionType` | `string` | **Required** . normal(Send BTC / CBTC) OR pegin(Convert BTC to CBTC) OR pegout(Convert CBTC to BTC) |
| `amount`          | `number` | **Required**. Amount to transfer in BTC                                                             |
| `receiverAddress` | `string` | **Required**. for normal transaction. **Optional**. for peg transaction                             |
| `feeRate`         | `number` | **Optional**. Fee rate per virtual byte                                                             |

#### Response

```response
{
  error: null,
  result:
  {
    txid: "6e16b14f7803d6fcb11a555b6e7e161b7af3eb4e618ff324ff21b31f15e7f1ae"
  },
  status: true
}
```

#### Response data types

| Parameter | Type             | Description                     |
| :-------- | :--------------- | :------------------------------ |
| `error`   | `string OR null` | error for the transfer request  |
| `result`  | `Object OR null` | result for the transfer request |
| `status`  | `boolean`        | status for the transfer request |

### 7. Sign Message

Sign Anduro wallet using sign function.

```bash
import React from 'react';
const { sign } = React.useContext<any>(useConnector);

const handleConnectResponse = async () => {
  const result = await sign({
   message: "sign message"
  })
}
```

#### Request data types

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `message` | `string` | **Required** . message to sign |

#### Response

```response
{
  error: null,
  result: "IK1OBlxobfS9pJiVVr88Kfg97uuJ1wnPDPHfLQfF7t4JBx7X5GDIO1Bhj+a2/+hyZyEWC9EKsj2KgnngF80VvdU=",
  status: true
}
```

#### Response data types

| Parameter | Type             | Description                 |
| :-------- | :--------------- | :-------------------------- |
| `error`   | `string OR null` | error for the sign request  |
| `result`  | `string OR null` | result for the sign request |
| `status`  | `boolean`        | status for the sign request |

### 8. Sign Transactions

Sign the PSBT raw hex using the signTransaction function.

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

#### Request data types

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `hex`     | `string` | **Required** . serialized hex |

#### Response

```response
{
  error: null,
  result: {signedHex:
"02000000000102aef1e7151fb321ff24f38f614eebf37a1b167e6e5b551ab1fcd603784fb1166e0000000000fdffffffaef1e7151fb321ff24f38f614eebf37a1b167e6e5b551ab1fcd603784fb1166e0100000000fdffffff028096980000000000160014937266dd00e16824d98e53d899c79728f50a6a240aad5300000000001600141d633457317f33abd1a8119e9f4af0d6b077c2f40247304402202362745b0cbe20680ea9b0d5dbf026cbdae2b7fe06784b184693745a8ff2db05022057f8a0944026be91e0de1366fdf3c7c55f406bf40ce1fdfee34b9efc83967a3a0121038f0767d3773829db262c59ac297f541f8cf047e12b6171286279de68f62745c702483045022100ece1794f2b89e62b4824bde0a4edf7c591f44d331f0e43777931cd38352472b802207e4b64d020ccd7509b06d8ea2d6bced2e47fd2eb48db4d14e4a63984b16817640121022b7ff89de365f25b8c29e3625c4c6f4c4e048d47e2d1ba41269272137e477bc100000000",
transactionSize: 209,
},
  status: true
}
```

#### Response data types

| Parameter | Type             | Description                 |
| :-------- | :--------------- | :-------------------------- |
| `error`   | `string OR null` | error for the sign request  |
| `result`  | `Object OR null` | result for the sign request |
| `status`  | `boolean`        | status for the sign request |

### 9. Send Transactions

Send a signed PSBT hex to the connected chain using the sendTransaction function.

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

#### Request data types

| Parameter | Type     | Description                                                 |
| :-------- | :------- | :---------------------------------------------------------- |
| `hex`     | `string` | **Required** . PSBT signed hex                              |
| `type`    | `string` | **Required** . type for the transaction (normal OR premium) |

#### Response

```response
{
  error: null,
  result: "96a4b76809164a4c30254dbac6a9e8135cc4ca331c04d0152d773230cc720d69",
  status: true
}
```

#### Response data types

| Parameter | Type             | Description                 |
| :-------- | :--------------- | :-------------------------- |
| `error`   | `string OR null` | error for the sign request  |
| `result`  | `string OR null` | transaction ID              |
| `status`  | `boolean`        | status for the sign request |

### 10. Sign And Send Transactions

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

#### Request data types

| Parameter | Type     | Description                                                 |
| :-------- | :------- | :---------------------------------------------------------- |
| `hex`     | `string` | **Required** . PSBT signed hex                              |
| `type`    | `string` | **Required** . type for the transaction (normal OR premium) |

#### Response

```response
{
  error: null,
  result: "96a4b76809164a4c30254dbac6a9e8135cc4ca331c04d0152d773230cc720d69",
  status: true
}
```

#### Response data types

| Parameter | Type             | Description                 |
| :-------- | :--------------- | :-------------------------- |
| `error`   | `string OR null` | error for the sign request  |
| `result`  | `string OR null` | transaction ID              |
| `status`  | `boolean`        | status for the sign request |

### 11. Send Alys transaction

Send Alys Transaction to be connected chain using the send Alys Transaction function .

```bash
import React from 'react';
const { sendAlys } = React.useContext<any>(useConnector);
const [unsignedHex, setUnsignedHex] = React.useState<string>("")
  const sendAlys = async () => {
    const hex = unsignedHex
    const transactionResult = await sendAlys({
      hex,
    })
  }
```

#### Request data types

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `hex`     | `string` | **Required** . serialized hex |

#### Response

```response
{
  error: null,
  result:
  {
    txid: "0x811165a6cc8d80b5771359556dfd149f4cb19f03284a76b987c821ce01f3a80d"
  },
  status: true
}
```

#### Response data types

| Parameter | Type             | Description                        |
| :-------- | :--------------- | :--------------------------------- |
| `error`   | `string OR null` | error for the transaction request  |
| `result`  | `Object OR null` | result for the transaction request |
| `status`  | `boolean`        | status for the transaction request |
