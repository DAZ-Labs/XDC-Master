var XDCValidator = artifacts.require('./XDCValidator');

module.exports = function(deployer) {
    return deployer.deploy(XDCValidator, [
        '0x89cdd0e4226204ad1a093cf898b6f4b1835b2004',
        '0xfd7c1fc5ee3a3eb515f07692cef434ee5f694e8c'
    ], [
        10 ** 18,
        10 ** 18
    ]);
};
