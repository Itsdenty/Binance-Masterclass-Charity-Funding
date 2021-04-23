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

let contractAddress = '0x7d417d0Bb17bE24000b8c738C17154FC145C97EF';
    
const abiPath = path.resolve('server', 'utils', 'VoteTokenABI.txt');
const abi = JSON.parse(fs.readFileSync(abiPath), 'utf8');

const pvk = process.env.PRIVATE_KEY;

const address = web3.eth.accounts.wallet.add(pvk);

console.log(pvk);
    
// const abi = contractJSON.abi;
    
const contract = new web3.eth.Contract(abi, contractAddress);


// let receiverAccount = '0xd045B9c78a1B3A822De358A4F75aff9434Fe3a0f';
// let receiverAccount = '0xec2d8ff499f24ed6e1ae1c695d48842d52b01e55';

const createAddress = () => {
    const ad = web3.eth.accounts.create(web3.utils.randomHex(32));
    console.log(ad);
    return ad;
}

const transfer = (address, amount) => {
    let receiverAccount = address;
    return new Promise ((resolve, reject) => {
        contract.methods.transfer(receiverAccount, amount).send({
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

const setupVotes = (data) => {
    return new Promise((resolve, reject) => {
        contract.methods.setVoteProfile(data.address, data.vote_allowed, data.vote_casted).send({
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
    });
}

const vote = (from, value) => {
    return new Promise((resolve, reject) => {
        const to = "0x0000000000000000000000000000000000000000";
        web3.eth.accounts.wallet.add(from.pk);
        contract.methods.transfer(to, value).send({
            from: from.address,
            gas: 1000000,         // Gas sent with each transaction 
            gasPrice: 20000000000,  // 20 gwei (in wei) 
        }).then(function(result) {
            console.log("result1", result.transactionHash)
            web3.eth.accounts.wallet.remove(from.pk);
            resolve(result.transactionHash);
        })
        .catch(function(e){
            console.log("update vote error", e)
            web3.eth.accounts.wallet.remove(from.pk);
            reject(e);
        })
    }) 
}

const updateVoteAllowed = (address, value) => {
    return new Promise((resolve, reject) => {
        const to = "0x0000000000000000000000000000000000000000";
        console.log(address, value);
        contract.methods.updateVoteAllowed(address, value).send({
            from: senderAccount,
            gas: 2000000,         // Gas sent with each transaction 
            gasPrice: 20000000000,  // 20 gwei (in wei) 
        }).then(function(result) {
            resolve(result.transactionHash);
        })
        .catch(function(e){
            console.log("update vote error2", e)
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

const getVoteProfile = (fundAddress) => {
    return new Promise((resolve, reject) => {
        // address fundAddress, uint voteValue, string memory voteHash, bool is_activated
        contract.methods.getVoteProfile(fundAddress).call().then(function(result) {
            resolve(result);
        })
        .catch(function(e){
            reject(e);
        })
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

const tokenFunctions =  {
    transfer,
    setupVotes,
    createAddress,
    vote,
    updateVoteAllowed,
    getBalance,
    getVoteProfile
}

export default tokenFunctions;

