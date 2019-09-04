import { LoggerLevel } from '../shared/utils/logger'
import { resolve } from 'path'

export default {
  port: 3210,
  redisConfig: {
    url: 'redis://:127.0.0.1',
    port: 6379,
  },
  helmet: { hidePoweredBy: { setTo: 'C++ 12' } },
  JWTSecret: 'aje494yvzor90zid9ez930193k1010e8',
  JWTExpiresIn: 60 * 60 * 24 * 30, // 30 day
  serverHost: 'https://uat-arya-api.1micro.cn',
}
