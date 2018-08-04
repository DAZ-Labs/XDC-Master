var XDCValidator = artifacts.require('./XDCValidator');
var BlockSigner = artifacts.require('./BlockSigner');

module.exports = function(deployer) {
    deployer.deploy(BlockSigner)
    return deployer.deploy(XDCValidator, [ ], [ ])
};
