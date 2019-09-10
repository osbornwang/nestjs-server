import * as _ from 'lodash';
import productionConfig from './prod.config';
import uatConfig from './uat.config';

export const isUat = process.env.NODE_ENV === 'uat';
export const isProd = process.env.NODE_ENV === 'production';

let config = {
  port: 3000,
  hostName: 'localhost',
  redisConfig: {
    host: '127.0.0.1',
    port: 6379,
    expirationTime: 60 * 10,
  },
  JWTSecret: 'aje494yvzor90zid9ez930193k1010e8',
  JWTExpiresIn: 60 * 60 * 24 * 30, // 30 day
};
if (isProd) {
  config = _.merge(config, productionConfig);
} else if (isUat) {
  config = _.merge(config, uatConfig);
}

export { config };
export default config;
