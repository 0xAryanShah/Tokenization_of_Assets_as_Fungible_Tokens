# Tokenization_of_Assets_as_Fungible_Tokens
## Real-World Use-Case for this Project <br/>
• Tokenization of any Assets as fungible Tokens (ERC20).<br/>
• Creation of Bonus Programs, Vouchers, etc.<br/>
• Creation of a new crypto currency.<br/>
• Creation of a Payment-layer on top of Ethereum.<br/>

## Steps
```
npm install -g truffle
truffle unbox react
npm install --save @openzeppelin/contracts
```
Copy the sample code from https://docs.openzeppelin.com/contracts/erc20
to set up ERC 20 Token

Installing Chai,Chai-bn,Chai-as-promised
```
npm install --save chai chai-bn chai-as-promised
```
Take the chai config from Openzeppelin test helpers https://github.com/OpenZeppelin/openzeppelin-test-helpers/blob/master/src/setup.js

Using Ganache GUI
```
networks: {
    development: {
      port: 7545,
      host: "127.0.0.1",
      network_id: 5777
    }
  },
  compilers: {
    solc: {
    version: "0.8.0"
    }
    }
```
put this into the truffle config file

using chai-as-promised

https://github.com/domenic/chai-as-promised#how-to-use