import {
  Module,
  HttpModule,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import config from '../config'
import { DemoController } from './demo/demo.controller'
import { DemoService } from './demo/demo.service'
import { AuthMiddleware } from './authentication/auth.middleware'
import { RedisModule } from 'nestjs-redis'

const ENTITIES = []

@Module({
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.JWTSecret,
      signOptions: {
        expiresIn: config.JWTExpiresIn,
      },
    }),
    RedisModule.register(config.redisConfig),
  ],
  controllers: [DemoController],
  providers: [DemoService],
})
export class FeatureModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
