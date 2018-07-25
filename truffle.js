'use strict'
const HDWalletProvider = require('truffle-hdwallet-provider')
const config = require('config')


module.exports = {
  networks: {
            development: {
                host: '127.0.0.1',
                port: 8545,
                network_id: '*'
            },
            XDC: {provider: function () {
                               return new HDWalletProvider(process.env.MNEMONIC, config.get('XDC'))
            },
            network_id: 40686
        },
    }
} 
