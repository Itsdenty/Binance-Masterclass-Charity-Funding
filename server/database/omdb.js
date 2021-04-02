import rp from 'request-promise';
import dotenv from 'dotenv';

dotenv.config();


const token = process.env.API_KEY;
const endpoint = process.env.BASE_URL;

const getSearch = async (keyword, page) => {
  console.log('page',page);
  const url = `${endpoint}?s=${keyword}&page=${page}&type=movie&apikey=${token}`;
  const returnData = await rp.get(url);
  return returnData;
};
const getDetails = async (id) => {
  const url = `${endpoint}?i=${id}&apikey=${token}`;
  const returnData = await rp.get(url);
  return returnData;
};

const mod = {
  getSearch,
  getDetails
}

export default mod;