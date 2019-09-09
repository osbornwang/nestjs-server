import * as _ from 'lodash';
import { resolve } from 'path';
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
  },
};
if (isProd) {
  config = _.merge(config, productionConfig);
} else if (isUat) {
  config = _.merge(config, uatConfig);
}

export { config };
export default config;
