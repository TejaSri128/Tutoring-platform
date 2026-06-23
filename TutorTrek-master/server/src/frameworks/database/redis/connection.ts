import configKeys from '../../../config';
import { createClient } from 'redis'

const connection = () => {
  const createRedisClient = () => {
    // If REDIS_URL is missing, fall back to an in-memory stub so local dev can run without Redis.
    if (!configKeys.REDIS_URL) {
      const store = new Map<string, string>();
      return {
        get: async (key: string) => store.get(key) ?? null,
        set: async (key: string, value: string) => {
          store.set(key, value);
        },
        del: async (key: string) => {
          store.delete(key);
        }
      } as any;
    }

    const client = createClient({
      url: configKeys.REDIS_URL,
    })
    client.on('error', err => console.log('Redis Client Error', err));
    client.connect().then(()=>{
      console.log("Redis connected successfully".bg_red.bold)
    }).catch((err)=>{
      console.log(err)
    })
    return client
    
  };

  return {
    createRedisClient
  };
}

export default connection