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

let contractAddress = '0xa601E22388C63CE976F00574C5764e516153cf81';
    
const abiPath = path.resolve('server', 'utils', 'VoteTokenABI.txt');
const abi = JSON.parse(fs.readFileSync(abiPath), 'utf8');

const pvk = process.env.PRIVATE_KEY;

const address = web3.eth.accounts.wallet.add(pvk);

console.log(pvk);
    
// const abi = contractJSON.abi;
    
const contract = new web3.eth.Contract(abi, contractAddress);

// let receiverAccount = '0xd045B9c78a1B3A822De358A4F75aff9434Fe3a0f';
// let receiverAccount = '0xec2d8ff499f24ed6e1ae1c695d48842d52b01e55';

const transfer = (address) => {
    let receiverAccount = address;
    return new Promise ((resolve, reject) => {
        contract.methods.transfer(receiverAccount, "200").send({
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

// contract.getPastEvents(
//     'AllEvents',
//     {
//       fromBlock: 5854000,
//       toBlock: 'latest'
//     },
//     (err, events) => { console.log(events) }
//   )

const tokenFunctions =  {
    transfer
}

export default tokenFunctions;

