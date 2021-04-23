// const axios = require('axios');
import axios from 'axios';

const apikey = process.env.PRIVATE_KEY;
// Make a request for a user with a given ID
const getBalance = async (address) => {
        return new Promise (async(resolve, reject) => {
            try {
            const balance = await axios.get('https://api-testnet.bscscan.com/api', {
                params: {
                  module: "account",
                  action: "balance",
                  address,
                  tag: "latest",
                  apikey
                }
              })
              let bal = parseInt(balance.data.result)/1000000000000000000
              resolve(bal.toFixed(2));
            } catch(e) {
                console.log(e);
                reject(error);
            }
        })
        // axios.get('https://api-testnet.bscscan.com/api?module=account&action=balance&address=0xb8bC5Bda67DDFeca29AB72EBaC0881A4bfE56F36&tag=latest&apikey=YourApiKeyToken')
}
const getTransactions = async (address, contractAddress) => {
        // https://api-testnet.bscscan.com/api?module=account&action=tokentx&contractaddress=0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51&address=0x7bb89460599dbf32ee3aa50798bbceae2a5f7f6a&page=1&offset=100&sort=asc&apikey=YourApiKeyToken
        return new Promise (async(resolve, reject) => {
            try {
            const transactions = await axios.get('https://api-testnet.bscscan.com/api', {
                    params: {
                    module: "account",
                    action: "tokentx",
                    contractAddress,
                    address,
                    page: 1,
                    offset: 10,
                    sort: "desc",
                    apikey
                    }
                })
                console.log(transactions.data);
                resolve(transactions.data);
                } catch(e) {
                    console.log(e);
                    reject(error);
                }
            })
        // axios.get('https://api-testnet.bscscan.com/api?module=account&action=balance&address=0xb8bC5Bda67DDFeca29AB72EBaC0881A4bfE56F36&tag=latest&apikey=YourApiKeyToken')
}
const bscFunctions = {
    getBalance,
    getTransactions
}
export default bscFunctions;