import { resolve } from 'path';

export default {
  port: 3000,
  hostName: 'localhost',
  redisConfig: { host: '127.0.0.1', port: 6379, expirationTime: 60 * 60 * 24 },
};
