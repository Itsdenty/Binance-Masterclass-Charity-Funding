const Web3 = require('web3');
const path = require('path');
const fs = require("fs");
const dotenv = require('dotenv');

dotenv.config();


let web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

let senderAccount = '0xb8bC5Bda67DDFeca29AB72EBaC0881A4bfE56F36';

let contractAddress = '0xB2eE37e74237cbaFeCff9833132e03EA89F826B8';
    
const abiPath = path.resolve('server', 'utils', 'CharityTokenAbi.txt');
const abi = JSON.parse(fs.readFileSync(abiPath), 'utf8');

const pvk = process.env.PRIVATE_KEY;

const address = web3.eth.accounts.wallet.add(pvk);

const contract = new web3.eth.Contract(abi, contractAddress);

const transferFrom = (fro, val) => {
    const from = fro;
    const value = val;
    let receiverAccount = from.address;
    web3.eth.accounts.wallet.add(from.pk);
    return new Promise ((resolve, reject) => {
        try {
            console.log(receiverAccount, senderAccount)
            contract.methods.transfer(senderAccount, value).send({
                from: receiverAccount,
                gas: 1000000,         // Gas sent with each transaction 
                gasPrice: 20000000000,  // 20 gwei (in wei) 
            }).on('transactionHash', function (hash) {
                console.log('hash: ', hash);
                web3.eth.accounts.wallet.remove(from.pvk);
                resolve(hash);
            }).on('error', function(error) {
                console.log("error", error);
                web3.eth.accounts.wallet.remove(from.pvk);
                reject(error);
            });
        } catch(e) {
            reject(e);
        }
    })
}
// const axios = require('axios');

// // Make a request for a user with a given ID
// const getBalance = async () => {
//     try {
//         const balance = await axios.get('https://api-testnet.bscscan.com/api', {
//             params: {
//               module: "account",
//               action: "balance",
//               address: "0xb8bC5Bda67DDFeca29AB72EBaC0881A4bfE56F36",
//               tag: "latest",
//               apikey: "3V4TZCWHNGDSRHP9PGJGH4ZEU7VDUA4NRQ"
//             }
//           })
//           let bal = parseInt(balance.data.result)/1000000000000000000
//           console.log("balance", bal.toFixed(2));
//         // axios.get('https://api-testnet.bscscan.com/api?module=account&action=balance&address=0xb8bC5Bda67DDFeca29AB72EBaC0881A4bfE56F36&tag=latest&apikey=YourApiKeyToken')
//     } catch(e) {
//         console.log(e);
//     }
// }
// getBalance();
const user = {
    blocked: false,
    vote_allowed: 10,
    vote_casted: 0,
    _id: '607bfd47b2b234a05c79f0aa',
    username: 'itsdenty',
    email: 'dent4real@yahoo.com',
    password: '$2b$10$4oIZHwVOPAqvSWz9g1yhfuTXRHDVNZfKmg/L/ayyRatJxWq2TQyyu',
    address: '0xE240d665a2Cdb38C65c6573Ef99C5f880165029e',
    pk: '0x34e0720fdde2d225ad3ed10cc030553a1ef896b03b08091884f13423efe4aa07',
    created_at: '2021-04-18T09:35:03.463Z',
    updated_at: '2021-04-18T09:35:03.463Z',
    __v: 0
  };

  const value = 1;

transferFrom(user, value);
