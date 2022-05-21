const Token = artifacts.require("MyToken");
const chai = require("./setupchai.js");
const BN = web3.utils.BN;

const expect = chai.expect;
require("dotenv").config({path: "../.env"});

contract("Token Test", function(accounts) {
        let [deployerAccount, recipient, anotheraccount] = accounts;
        beforeEach(async() =>{
            this.myToken = await Token.new(process.env.INTIAL_TOKENS);
        })

    
        it("should put all the coins in the first account", async () => {
          this.instance = this.myToken;
          let totalSupply = await this.instance.totalSupply();
          return expect(this.instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
        });

        it("is possible to send tokens to another account", async ()=>{
            const sendToken = 1;
            this.instance = this.myToken;
            let totalSupply = await this.instance.totalSupply();
            expect(this.instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
            await expect(this.instance.transfer(recipient,sendToken)).to.eventually.be.fulfilled;
            expect(this.instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
            return expect(this.instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendToken));           
        });        
        it("It's not possible to send more tokens than account 1 has", async () => {
            this.instance = this.myToken;
            let balanceOfAccount = await this.instance.balanceOf(deployerAccount);
            await expect(this.instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.rejected;            
            //check if the balance is still the same
            return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
        });
           
    });