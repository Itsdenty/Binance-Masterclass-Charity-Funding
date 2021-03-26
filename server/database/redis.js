import redis from 'redis';
import util from 'util';
import dotenv from 'dotenv';

import log from '../utils/logger';

dotenv.config();

const redisUrl = process.env.REDIS_URL;
const client = redis.createClient(redisUrl);

class Redis {
  static async get(key) {
    const get = util.promisify(client.get).bind(client);
    const result = await get(key);
    if (result) {
      log.info(JSON.stringify({ message: 'getting from cache' }));
    }
    return result;
  }

  static set(key, data) {
    const set = client.set(key, data, 'Ex', 2 * 60 * 60);
    return set;
  }

  static del(key) {
    const del = client.del(key);
    return del;
  }
}

export default Redis;
