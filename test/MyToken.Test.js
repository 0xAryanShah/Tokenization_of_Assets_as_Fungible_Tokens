const Token = artifacts.require("MyToken");

var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", function(accounts) {
    let deployerAccount, recipient, anotheraccount;

    beforeEach(async function() {     
        deployerAccount = accounts[0];
        recipient = accounts[1];
        this.instance = await Token.new(1000000000);        
      });
    //let [deployerAccount, recipient, anotheraccount] = accounts; 

        it("should put all the coins in the first account", async () => {
          this.instance = await Token.deployed();
          let totalSupply = await this.instance.totalSupply();
          expect(this.instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
        });

        it("is possible to send tokens to another account", async ()=>{
            const sendToken = 1;
            this.instance = await Token.deployed();
            let totalSupply = await this.instance.totalSupply();
            await expect(this.instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
            await expect(this.instance.transfer(recipient,sendToken)).to.eventually.be.fulfilled;
            await expect(this.instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
            await expect(this.instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendToken));
            await expect(this.instance.transfer(deployerAccount,sendToken,{from :recipient})).to.eventually.be.fulfilled;
            await expect(this.instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
            // result = await this.instance.balanceOf(deployerAccount);
            // console.log(result);
        });        
        it("It's not possible to send more tokens than account 1 has", async () => {
            this.instance = await Token.deployed();
            let balanceOfAccount = await this.instance.balanceOf(deployerAccount);
            await expect(this.instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;            
            //check if the balance is still the same
            expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
        });
           
    });