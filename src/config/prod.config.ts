import { resolve } from 'path'

export default {
  port: 3210,

  emailExpireTime: 1000 * 60 * 60 * 24,

  domain: 'https://arya-api.1micro.cn',

  h5Domain: 'https://arya-h5.1micro.cn',

  orm: {
    type: 'mysql',
    host: 'localhost',
    port: 3312,
    username: 'root',
    password: 'Fy7bF3vHwJvaNgkHmTvwJgXgLLUbrA',
    database: 'arya',
    entities: [resolve('./**/*.entity.js')],
    dropSchema: false,
    synchronize: false,
    logging: false,
  },
}
