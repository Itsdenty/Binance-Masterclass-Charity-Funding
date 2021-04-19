// const axios = require('axios');
import axios from 'axios';

const apikey = process.env.PRIVATE_KEY;
// Make a request for a user with a given ID
const getBalance = async (address) => {
    try {
        return new Promise (async(resolve, reject) => {
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
        })
    } catch(e) {
        console.log(e);
        reject(error);
    }
        // axios.get('https://api-testnet.bscscan.com/api?module=account&action=balance&address=0xb8bC5Bda67DDFeca29AB72EBaC0881A4bfE56F36&tag=latest&apikey=YourApiKeyToken')
}

const bscFunctions = {
    getBalance
}
export default bscFunctions;