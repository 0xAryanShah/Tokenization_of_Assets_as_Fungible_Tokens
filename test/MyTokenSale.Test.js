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
    it('all tokens should be present in the MyTokenSale Contract', async() => {
        let instance = await MyToken.deployed();
        let balanceOfSaleSC = await instance.balanceOf(MyTokenSale.address);
        let totalSupply = await instance.totalSupply();
        expect(balanceOfSaleSC).to.be.bignumber.equal(totalSupply);
    });
    it('should be possible to buy tokens',async() =>{
        let tokeninstance = await MyToken.deployed();
        let saleInstance = await MyTokenSale.deployed();
        let beforeBalance = await tokeninstance.balanceOf(deployerAccount);        
        await expect(saleInstance.sendTransaction({from: deployerAccount , value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(tokeninstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(beforeBalance.add(new BN(1)));

    });
});