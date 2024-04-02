# anduro-wallet-connector 

Anduro Wallet Connector is react library for connect, disconnect, send transaction ( BTC & CBTC ), asset creation, asset transfer , mint transfer, convert ( BTC to CBTC ), convert ( CBTC to BTC) in anduro browser wallet extension.

## Examples

See our [Examples Repo][examples] for example anduro wallet connector react library integration
implementations.

## Installing

For the latest stable version:

```bash
npm install anduro-wallet-connector
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

