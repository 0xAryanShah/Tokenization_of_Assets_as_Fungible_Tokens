const Token = artifacts.require("MyToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async (accounts) => {
    //beforeEach(async function (accounts) {     
        let [deployerAccount, recipient, anotheraccount] = accounts;
        //this.instance = await Token.new();        
      //});
    //let [deployerAccount, recipient, anotheraccount] = accounts; 

        it("should put all the coins in the first account", async () => {
          const instance = await Token.deployed();
          let totalSupply = await instance.totalSupply();
          expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
        });

        it("is possible to send tokens to another account", async ()=>{
            const sendToken = 1;
            let instance = await Token.deployed();
            let totalSupply = await instance.totalSupply();
            expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
            expect(instance.transfer(recipient,sendToken)).to.eventually.be.fulfilled;
            expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
            expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendToken));
            //expect(instance.connect(recipient).transfer(deployerAccount,sendToken)).to.eventually.be.fulfilled;
        });
        it("is possible to send tokens to another account 2", async ()=>{
            const sendToken = 1;
            let instance = await Token.deployed();
            let totalSupply = await instance.totalSupply();
            expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
            expect(instance.transfer(recipient,sendToken)).to.eventually.be.fulfilled;
            expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
            expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendToken));
            //expect(instance.connect(recipient).transfer(deployerAccount,sendToken)).to.eventually.be.fulfilled;
        });
        // it("It's not possible to send more tokens than account 1 has", async () => {
        //     let instance = await Token.deployed();
        //     let balanceOfAccount = await instance.balanceOf(deployerAccount);
        //     expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;            
        //     //check if the balance is still the same
        //     //expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
        // });
           
    });