'use strict'

const HDWalletProvider = require('truffle-hdwallet-provider')
const config = require('config')
const TestRPC = require('ganache-cli')

module.exports = {
    networks: {
        development: {
            // provider: function () {
            //     let wallet = new HDWalletProvider(process.env.MNEMONIC, 'http://127.0.0.1:8545')
            //     return wallet
            // },
            provider: TestRPC.provider(),
            network_id: '*' // Match any network id
        },
        local: {
            host: 'localhost',
            port: 8545,
            gas: 4000000,
            network_id: '*'
        },
        XDC: {
            provider: function () {
                return new HDWalletProvider(config.get('truffle.mnemonic'), config.get('blockchain.rpc'))
            },
            network_id: config.get('blockchain.networkId'),
            gasPrice: 1
        }
    }
}
