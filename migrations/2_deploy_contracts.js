var Ownable = artifacts.require("./Ownable.sol");
var Mortal = artifacts.require("./Mortal.sol");

module.exports = function(deployer) {
    deployer.deploy(Ownable);
    deployer.deploy(Mortal);
};
