const config = require('config');

const XDCValidator = artifacts.require('./XDCValidator');
const XDCRandomize = artifacts.require('./XDCRandomize');
const BlockSigner = artifacts.require('./BlockSigner');

const minCandidateCap = config.get('truffle.minCandidateCap');
const maxValidatorNumber = config.get('truffle.maxValidatorNumber');
const candidateWithdrawDelay = config.get('truffle.candidateWithdrawDelay');
const epochNumber = config.get('truffle.epochNumber');
const blockTimeSecret = config.get('truffle.blockTimeSecret');
const blockTimeOpening = config.get('truffle.blockTimeOpening');


module.exports = function(deployer) {

    return deployer.deploy(XDCValidator, [], [], minCandidateCap, maxValidatorNumber, candidateWithdrawDelay).then(() => {
        return  deployer.deploy(XDCRandomize, epochNumber, blockTimeSecret, blockTimeOpening)
    }). then(() => {
        return deployer.deploy(BlockSigner);
    }
)};