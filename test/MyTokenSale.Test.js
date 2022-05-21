const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
const chai = require("./setupchai.js");
const BN = web3.utils.BN;

const expect = chai.expect;
require("dotenv").config({path: "../.env"});

contract("Token Test", function(accounts) {
    let [deployerAccount, recipient, anotheraccount] = accounts;
    it('should not have any tokens left in the deployer account',async() =>{
        let instance = await MyToken.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });
});