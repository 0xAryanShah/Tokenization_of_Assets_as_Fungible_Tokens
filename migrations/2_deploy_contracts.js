var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale.sol");
require("dotenv").config({path: "../.env"});

module.exports = async function(deployer) {
  addr = await web3.eth.getAccounts();
  await deployer.deploy(MyToken,process.env.INTIAL_TOKENS);
  await deployer.deploy(MyTokenSale,1,addr[0],MyToken.address);
  let instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address,process.env.INTIAL_TOKENS);
};