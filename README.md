## XinFin Governance DApp
This is Governance Dapp for XinFin. Full-Node can apply to become a candidate for masternode. Coin Holder can vote for candidates to become masternodes. See the detail from technical Whitepaper: [https://XinFin.com/docs/technical-whitepaper--1.0.pdf](https://XinFin.com/docs/technical-whitepaper--1.0.pdf)

## Requirements
- MongoDB
- Truffle Framework

## Config
```
cp config/default.json config/local.json
```
Update `local.json` file to support your environment

## Install
```
npm install
truffle deploy --reset --network XDC
```
Note: before deploying to XinFin testnet, make sure you have $XDC in the wallet. If not, get free at [https://faucet.XinFin.com](https://faucet.XinFin.com)

## Run
```
npm run dev
```
The site will run at [`http://localhost:3000`](http://localhost:3000)

## Test
```
npm run test
```
Or run command
```
truffle test
``` 



To test a special file
```
npm run test path_to_file/file.js
```
Or run command
```
truffle test path_to_file/file.js
```

