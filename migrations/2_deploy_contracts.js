const XDCValidator = artifacts.require('./XDCValidator');
const XDCRandomize = artifacts.require('./XDCRandomize');
const BlockSigner = artifacts.require('./BlockSigner');

const config = require('config');
minCandidateCap = maxValidatorNumber = candidateWithdrawDelay = voterWithdrawDelay = epochNumber = blockTimeSecret = blockTimeOpening = 0;
if (config.has('truffle')){
    minCandidateCap = config.get('truffle.minCandidateCap');
    maxValidatorNumber = config.get('truffle.maxValidatorNumber');
    candidateWithdrawDelay = config.get('truffle.candidateWithdrawDelay');
    voterWithdrawDelay = config.get('truffle.voterWithdrawDelay');
    epochNumber = config.get('truffle.epochNumber');
    blockTimeSecret = config.get('truffle.blockTimeSecret');
    blockTimeOpening = config.get('truffle.blockTimeOpening');
}

module.exports = function(deployer) {

    return deployer.deploy(XDCValidator, minCandidateCap, maxValidatorNumber, candidateWithdrawDelay, voterWithdrawDelay).then((tv) => {
        //console.log('tv', tv.contract._eth.getTransactionCount("0x487d62d33467c4842c5e54eb370837e4e88bba0f"))
        return  deployer.deploy(XDCRandomize, epochNumber, blockTimeSecret, blockTimeOpening)
    }). then(() => {
        return deployer.deploy(BlockSigner);
    })
};
