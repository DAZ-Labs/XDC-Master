## XinFIn Governance DApp
This is Governance Dapp for XinFIn. Full-Node can apply to become a candidate for masternode. Coin Holder can vote for candidates to become masternodes. See the detail from technical Whitepaper: [https://XinFIn.com/docs/technical-whitepaper--1.0.pdf](https://XinFIn.com/docs/technical-whitepaper--1.0.pdf)

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
truffle deploy --reset --network XDC
npm install
```
Note: before deploying to XinFIn testnet, make sure you have $XDC in the wallet. If not, get free at https://faucet.XinFIn.com

## Run
```
npm run dev
```
The site will run at `http://localhost:3000`
