# anduro-wallet-connector

Anduro Wallet Connector is a React library that will enable users to easily connect to the Anduro Wallet browser extension. This library includes the below options:

- Connect
- Disconnect
- Send transaction ( BTC & CBTC )
- Asset creation
- Asset transfer
- Mint transfer
- Convert ( BTC to CBTC )
- Convert ( CBTC to BTC)
- Sign
- Sign transaction
- Send transaction
- Sign and send transaction

## Examples

See our [Examples](https://github.com/AnduroProject/anduro-wallet-connector-react/tree/main/example) for anduro wallet connector react library integration and
implementations.

- [React Example](https://github.com/AnduroProject/anduro-wallet-connector-react/tree/main/example/react)
- [Next.js Example](https://github.com/AnduroProject/anduro-wallet-connector-react/tree/main/example/next-js)

## Before running example, please follow below things.

Since the chrome extension is not published. please do below steps temporarily to connect wallet from your browser

## How to run the Anduro Wallet on a local machine

1. Unzip the wallet file. (Anduro-Wallet.zip)
2. Go to your browser (e.g., Chrome).
3. Click manage extensions.
4. Enable developer mode.
5. Click Load Unpacked
6. Open(import) the unzipped Anduro-Wallet directory.
7. Now you can see the Anduro wallet extension in your browser
8. Copy Anduro wallet Extension id from your Manage extension
9. Replace with EXTENSION_ID in below Anduro wallet url

## Anduro wallet url

```bash
chrome-extension://<EXTENSION_ID>/index.html
```

## React Example

1. Go to example/react/src/config/walletApi.ts
2. Replace WALLETURL with your browser wallet url

## Next.js Example

1. Go to example/next-js/src/app/config/config.ts
2. Replace WALLETURL with your browser wallet url

## Installing example app

- go to example folder and run below command
  ```bash
  npm install
  ```

## Usage

Initialize Anduro Wallet Connector with your wallet extension id via the options parameter:

```bash
import { UseConnectorProvider } from 'anduro-wallet-connector';
import React from 'react';

function App () {
  return (
    <UseConnectorProvider walletURL={Anduro wallet url}/>
  );
}
```

we will use the <UseConnectorProvider /> component to connect anduro wallet extension.

### 1. Connect Anduro Wallet

Connect Anduro wallet using connect function.

**Parameter**

chainId: 1 or 2 or 3 or 4

- 1 for Bitcoin mainnet
- 2 for Sidechain mainnet
- 3 for Bitcoin testnet
- 4 for Sidechain testnet

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

### 3. Create Asset

Create Asset in Anduro wallet using create asset function.

**Parameters**

name: The asset's name  
symbol: The asset's symbol  
imageUrl: The asset's image URL
supply: The asset's total supply
properties: The asset's trait data
assetType:

1. 0 for creating tokens.
2. 1 for creating NFT.\
   transactionType: transactionType: create OR mint\
   receiverAddress: (Optional) Required for mint transactions
   assetId: (Optional) Required for mint transactions

```bash
import { useConnector } from 'anduro-wallet-connector';
import React from 'react';

const {createasset} = React.useContext<any>(useConnector);

const handleCreateAssetAction = async () => {
  const result = await createasset({
    name: "Anduro",
    symbol: "Anduro",
    imageUrl: "https://anduro.png/",
    supply: 100,
    properties: [{type: "#1 Type", value: "#1 Value"}],
    assetType: 0,
    transactionType: "create",
    receiverAddress: "ccrt1qy6302x6qm8084tfwuf2hagfe8ndvpevg3u5n2j",
    assetId: 1,
  })
}
```

### 4. Transfer Asset

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

### 5. Network and wallet informations

We provide network and wallet information

```bash
import { useConnector } from 'anduro-wallet-connector';
import React from 'react';

const { networkState, walletState } = React.useContext<any>(useConnector);
```

### 6. Send / Convert ( BTC and CBTC )

**Parameters**

transactionType:\
1.normal - Send BTC / CBTC \
2.pegin - Convert BTC to CBTC ,\
3.pegout - Convert CBTC to BTC\
amount: transaction amount.\
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

### 7. Sign Anduro Wallet

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


### 8. Sign Transactions

Sign the PSBT raw hex using the signTransaction function.

**Parameter**

hex: PSBT raw hex

```bash
import React from 'react';
const { signTransaction } = React.useContext<any>(useConnector);

  const signTransactions = async () => {
    const hex =
      "70736274ff01007102000000010b19d8363aa4026390d46e49b4c454da11e16d3af5a1a40cbc517f53a95e90870000000000fdffffff0200e1f50500000000160014eb21c968ebba6d2f4b651969fde78434090fc8bdecb1a43500000000160014a868c2c1d0b209ed561b714eee1e0a0c08d5737a00000000000100de02000000000101c7529142d68f990302a65922d3f8fbccae4a0fcea9aaae42d43a8eebb3f3d42c0000000000fdffffff0200ca9a3b00000000160014548a63aea10446588b59868a68f87343cde6586e5b7be60e00000000160014a2e2fab26c3a24c64bb94e4405896c1f311fcc1302473044022047777dd71ff26babb3eeab67db31f1191bd3c38596617977c5b4599130e9bf3302203a91fe0db726aaabaa85664731e448e9da90d5c8b544b6907244d631c63e4b770121031ba6b86cdfd45a5f10cbd2c76063cb64ad773bd6760ead1487fbf6377f208bd0b7060000000000"
    const signResult = await signTransaction({
      hex,
    })
    if (signResult.status) {
      setSignedHex(signResult.result.signedHex)
    }
  }
```


### 9. Send Transactions

Send a signed PSBT hex to the connected chain using the sendTransaction function.

**Parameter**

hex: PSBT signed hex

```bash
import React from 'react';
const { sendTransaction } = React.useContext<any>(useConnector);

  const sendTransactions = async () => {
    const sendResult = await sendTransaction({
      hex: signedHex,
    })
  }
```

### 10. Sign And Send Transactions

Sign and send a transaction to the connected chain using the signAndSendTransaction function.

**Parameter**

hex: PSBT raw hex

```bash
import React from 'react';
const { signAndSendTransaction } = React.useContext<any>(useConnector);

  const signAndSendTransactions = async () => {
    const hex =
      "70736274ff01007102000000015e6d75cc8e6fb4b307bfb880262e186538ae103c131634bbebf26dcdd68f1a930100000000fdffffff020065cd1d00000000160014eb21c968ebba6d2f4b651969fde78434090fc8bdec2dcd1d00000000160014a868c2c1d0b209ed561b714eee1e0a0c08d5737a00000000000100de02000000000101f026669f3cfbef1168b9393074f35b3c165530070a2b522ef22c3f42cd7967410000000000fdffffff02dbf76759000000001600149c7b72d8b076c382bbc23d0aa4b6d10832d6665800ca9a3b00000000160014548a63aea10446588b59868a68f87343cde6586e0247304402206c3b60c6461ef3d24a1d8b09caf25a56cc474638cfc983c3ea7fc00043b7e7cf022025894d45aea71fe9e9595ce9ecfd5c8bb89dd205874d4d3b1220f364d48f2c1b0121031ba6b86cdfd45a5f10cbd2c76063cb64ad773bd6760ead1487fbf6377f208bd0b7060000000000"
    const transactionResult = await signAndSendTransaction({
      hex,
    })
  }
```