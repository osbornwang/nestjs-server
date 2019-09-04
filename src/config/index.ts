import * as _ from 'lodash'
import { resolve } from 'path'
import * as qiniu from 'qiniu'

import productionConfig from './prod.config'
import testConfig from './test.config'

export const isUat = process.env.NODE_ENV === 'uat'
export const isProd = process.env.NODE_ENV === 'production'
export const isTest = process.env.NODE_ENV === 'test'

let config = {
  port: 3300,
  hostName: 'localhost',

  helmet: { hidePoweredBy: { setTo: 'C++ 12' } },

  AppID: 'wxe504e52c0d7a966d',
  AppSecret: 'ef2c33c9807d24a3ea4f379dbdd0dfd6',

  JWTSecret: 'aje494yvzor90zid9ez930193k1010e8',
  JWTExpiresIn: 60 * 60 * 24 * 30, // 30 day

  emailExpireTime: 1000 * 60 * 5,
  static: {
    root: 'static',
    prefix: '/static/',
  },

  orm: {
    type: 'mysql',
    host: 'localhost',
    port: 3310,
    username: 'root',
    password: '123456',
    database: 'arya',
    entities: [resolve(`./**/*.entity${isUat ? '.js' : '.ts'}`)],
    timezone: 'UTC',
    charset: 'utf8mb4',
    multipleStatements: true,
    dropSchema: false,
    synchronize: false,
    logging: true,
  },

  qiniu: {
    ak: 'vAo3nME4olY7Q3_3QAbnKono3P7_gXU_95WUsEYd',
    sk: 'rNCNC4p0k4CF63-Tb0yLB9YRKoi8hVPFaUdwwOI9',
    zone: qiniu.zone.Zone_z0,
    bucket: 'jonsnow',
  },

  domain: 'https://uat-arya-api.1micro.cn',

  h5Domain: 'https://uat-arya-h5.1micro.cn',
  // domain: "http://localhost:3110",

  mail163: {
    user: 'jonsnowprince@163.com',
    pass: '3jcpW2tq8rvE9wNm',
  },

  githubConf: {
    assignee: 'twerjonsnow',
    reporter: 'twerjonsnow',
    Authorization: 'token d5279be59ee0557451800514ac88ac306f7338b1',
    url: `https://api.github.com/repos/${
      isProd ? 'TheBund1st/jonsnow-issue' : 'twerjonsnow/uat-arya-issues'
    }/issues`,
  },

  grpcConf: {
    protoPath: resolve(__dirname + '../../../proto/wechat.proto'),
    serverUrl: '0.0.0.0:3301',
    targetServerUrl: '0.0.0.0:6000',
    packageName: 'wechat',
    serviceName: 'Wechat',
  },
}
if (isProd) {
  config = _.merge(config, productionConfig)
} else if (isTest) {
  config = _.merge(config, testConfig)
}

export { config }
export default config
