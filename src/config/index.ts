import * as _ from 'lodash'
import { resolve } from 'path'

import productionConfig from './prod.config'
import testConfig from './test.config'

export const isUat = process.env.NODE_ENV === 'uat'
export const isProd = process.env.NODE_ENV === 'production'
export const isTest = process.env.NODE_ENV === 'test'

let config = {
  port: 3300,
  hostName: 'localhost',
  helmet: { hidePoweredBy: { setTo: 'C++ 12' } },
  JWTSecret: 'aje494yvzor90zid9ez930193k1010e8',
  JWTExpiresIn: 60 * 60 * 24 * 30, // 30 day
  serverHost: 'https://uat-arya-api.1micro.cn',
  redisConfig: {
    url: 'redis://:127.0.0.1',
    port: 6379,
  },
}
if (isProd) {
  config = _.merge(config, productionConfig)
} else if (isTest) {
  config = _.merge(config, testConfig)
}

export { config }
export default config
