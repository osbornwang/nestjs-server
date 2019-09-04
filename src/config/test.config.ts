import { LoggerLevel } from '../shared/utils/logger'
import { resolve } from 'path'

export default {
  orm: {
    type: 'mysql',
    host: '118.25.57.50',
    port: 3310,
    username: 'root',
    password: '123456',
    database: 'arya_test',
    entities: [resolve(`./**/*.entity.ts`)],
    timezone: 'UTC',
    charset: 'utf8mb4',
    multipleStatements: true,
    dropSchema: false,
    synchronize: false,
    logging: true,
  },
}
