# anduro-wallet-connector 

Anduro Wallet Connector is react library for connect, disconnect, send transaction ( BTC & CBTC ), asset creation, asset transfer , mint transfer, convert ( BTC to CBTC ), convert ( CBTC to BTC) in anduro browser wallet extension.

##

## Examples

See our [Examples Repo][examples] for example anduro wallet connector react library integration
implementations.

## Before running example, pls follow below things.
Since the chrome extension is not published. please do below steps temporarily to connect wallet from website
1. Go to examples/src/config/walletApi.ts
2. Replace WALLETURL with your browser wallet url


## Installing example app

go to example folder and run below command

```bash
npm install
```

[examples]: https://github.com/MarathonDH/anduro-wallet-connector-react/tree/main/example


## Usage

Initialize Anduro Wallet Connector with your wallet extension id via the options parameter:


```bash 
import { UseConnectorProvider } from 'anduro-wallet-connector';
import React from 'react';

function App () {
  return (
    <UseConnectorProvider />
  );
}
```

we will use the <UseConnectorProvider /> component to connect anduro wallet extension.

### 1. Connect Anduro Wallet 

Connect Anduro wallet using connect function. 

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

name: Asset name  
symbol: Asset Symbol  
imageUrl: Image Url for asset   

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

### 4.Transfer Asset

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

### 5.Network and wallet informations

We provide network and wallet information

```bash
import { useConnector } from 'anduro-wallet-connector';
import React from 'react';

const { networkState, walletState } = React.useContext<any>(useConnector);
```

### 6.Send / Convert  ( BTC and CBTC )

**Parameters**

transactionType: 
  1.normal - Send BTC / CBTC 
  2.pegin - Convert BTC to CBTC , 
  3.pegout - Convert CBTC to BTC 
amount: transaction amount.
receiverAddress: Receiver address ( Sidechain address / bitcoint address )
feeRate: Fee rate per virtual byte


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

