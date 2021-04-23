import Web3 from 'web3';
// import TX from 'ethereumjs-tx';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

// const dat = require('../../')

dotenv.config();
// const Web3 = require('web3');
// const fs = require('fs');
// const provider = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
let web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

let senderAccount = '0xb8bC5Bda67DDFeca29AB72EBaC0881A4bfE56F36';

let contractAddress = '0xB2eE37e74237cbaFeCff9833132e03EA89F826B8';
    
const abiPath = path.resolve('server', 'utils', 'CharityTokenAbi.txt');
const abi = JSON.parse(fs.readFileSync(abiPath), 'utf8');

const pvk = process.env.PRIVATE_KEY;

const address = web3.eth.accounts.wallet.add(pvk);

// web3.eth.getAccounts(function(error, result) {
//     console.log(address);
// });

console.log(pvk);
    
// const abi = contractJSON.abi;
    
const contract = new web3.eth.Contract(abi, contractAddress);

// let receiverAccount = '0xd045B9c78a1B3A822De358A4F75aff9434Fe3a0f';
// let receiverAccount = '0xec2d8ff499f24ed6e1ae1c695d48842d52b01e55';

const createFundingAccount = ({ fundAddress, target_amount, description, proof}) => {
    return new Promise((resolve, reject) => {

        contract.methods.setCharityAccount(fundAddress, target_amount, description, proof).send({
            from: senderAccount,
            gas: 1000000,         // Gas sent with each transaction 
            gasPrice: 20000000000,  // 20 gwei (in wei) 
        }).on('transactionHash', function (hash) {
            console.log('hash: ', hash);
            resolve(hash);
        }).on('error', function(error) {
            console.log("error", error);
            reject(error);
        });
    })
}

const getFundingAccount = (fundAddress) => {
    return new Promise((resolve, reject) => {
        contract.methods.getCharityAccount(fundAddress).send({
            from: senderAccount,
            gas: 1000000,         // Gas sent with each transaction 
            gasPrice: 20000000000,  // 20 gwei (in wei) 
        }).on('transactionHash', function (hash) {
            console.log('hash: ', hash);
            resolve(hash);
        }).on('error', function(error) {
            console.log("error", error);
            reject(error);
        });
    })
}

const voteAccount = (fundAddress, voteValue, voteHash, is_activated) => {
    return new Promise((resolve, reject) => {
        // address fundAddress, uint voteValue, string memory voteHash, bool is_activated
        contract.methods.voteAccount(fundAddress, voteValue, voteHash, is_activated).send({
            from: senderAccount,
            gas: 1000000,         // Gas sent with each transaction 
            gasPrice: 20000000000,
        }).then(function(result) {
            resolve(result);
        }).catch(function(e){
            console.log("vote new error", error);
            reject(e);
        })
    });
}

const closeAccount = (fundAddress) => {
    return new Promise((resolve, reject) => {
        // address fundAddress, uint voteValue, string memory voteHash, bool is_activated
        contract.methods.closeAccount(fundAddress).send({
            from: senderAccount,
            gas: 1000000,         // Gas sent with each transaction 
            gasPrice: 20000000000,
        }).then(function(result) {
            resolve(result);
        }).catch(function(e){
            reject(e);
        });
    });
}

const activateAccount = (fundAddress) => {
    return new Promise((resolve, reject) => {
        // address fundAddress, uint voteValue, string memory voteHash, bool is_activated
        contract.methods.activateAccount(fundAddress).send({
            from: senderAccount,
            gas: 1000000,         // Gas sent with each transaction 
            gasPrice: 20000000000,
        }).then(function(result) {
            resolve(result);
        })
        .catch(function(e){
            reject(e);
        })
    })
}

const getBalance = (fundAddress) => {
    return new Promise((resolve, reject) => {
        // address fundAddress, uint voteValue, string memory voteHash, bool is_activated
        contract.methods.balanceOf(fundAddress).call().then(function(result) {
            resolve(result);
        })
        .catch(function(e){
            reject(e);
        })
    })
}

const sendBNB = (fro, val) => {
    const from = fro;
    const value = val;
    return new Promise((resolve, reject) => {
        web3.eth.accounts.wallet.add(from.pk);
        web3.eth.sendTransaction({
            from: from.address,
            to: senderAccount,
            value: web3.utils.toWei(value, "ether"),
            gas: 1000000,         // Gas sent with each transaction 
            gasPrice: 20000000000,
        })
        .then(function (hash) {
            console.log('hash: ', hash);
            web3.eth.accounts.wallet.remove(from.pvk);
            resolve(hash);
        }).catch(function(error) {
            console.log("error", error);
            web3.eth.accounts.wallet.remove(from.pvk);
            reject(error);
        }); // If a out of gas error, the second parameter is the receipt.
    })
}


const transfer = (address, amount) => {
    let receiverAccount = address;
    return new Promise ((resolve, reject) => {
        contract.methods.transfer(receiverAccount, amount).send({
            from: senderAccount,
            gas: 1000000,         // Gas sent with each transaction 
            gasPrice: 20000000000,  // 20 gwei (in wei) 
        }).then(function (hash) {
            console.log('hash: ', hash);
            web3.eth.accounts.wallet.remove(from.pvk);
            resolve(hash);
        }).catch(function(error) {
            console.log("error", error);
            web3.eth.accounts.wallet.remove(from.pvk);
            reject(error);
        });
    })
}

const sellBNB = (to, value) => {
    return new Promise((resolve, reject) => {
        web3.eth.sendTransaction({
            from: senderAccount,
            to,
            value: web3.utils.toWei(value, "ether"),
            gas: 1000000,         // Gas sent with each transaction 
            gasPrice: 20000000000,
        })
        .then(function (hash) {
            console.log('hash: ', hash);
            web3.eth.accounts.wallet.remove(from.pvk);
            resolve(hash);
        }).catch(function(error) {
            console.log("error", error);
            web3.eth.accounts.wallet.remove(from.pvk);
            reject(error);
        });// If a out of gas error, the second parameter is the receipt.
    })
}
// contract.getPastEvents(
//     'AllEvents',
//     {
//       fromBlock: 5854000,
//       toBlock: 'latest'
//     },
//     (err, events) => { console.log(events) }
//   )
const transferFrom = (fro, val) => {
    const from = fro;
    const value = val;
    let receiverAccount = from.address;
    web3.eth.accounts.wallet.add(from.pk);
    return new Promise ((resolve, reject) => {
        // try {
            console.log(receiverAccount, senderAccount)
            contract.methods.transfer(senderAccount, value).send({
                from: receiverAccount,
                gas: 1000000,         // Gas sent with each transaction 
                gasPrice: 20000000000,  // 20 gwei (in wei) 
            }).then(function (hash) {
                console.log('hash: ', hash);
                web3.eth.accounts.wallet.remove(from.pvk);
                resolve(hash);
            }).catch(function(error) {
                console.log("error", error);
                web3.eth.accounts.wallet.remove(from.pvk);
                reject(error);
            });
        // } catch(e) {
        //     reject(e);
        // }
    })
}
const tokenFunctions =  {
    createFundingAccount,
    getFundingAccount,
    voteAccount,
    closeAccount,
    activateAccount,
    getBalance,
    sendBNB,
    transfer,
    sellBNB,
    transferFrom
}

export default tokenFunctions;