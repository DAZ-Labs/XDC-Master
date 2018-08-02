var XDCValidator = artifacts.require('./XDCValidator');

module.exports = function(deployer) {
    return deployer.deploy(XDCValidator, [ ], [ ]);
};
