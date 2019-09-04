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
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer'

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
    TypeOrmModule.forRoot(config.orm as TypeOrmModuleOptions),
    TypeOrmModule.forFeature([...ENTITIES]),
    MailerModule.forRoot({
      transport: {
        service: '163',
        // host: "smtp.163.com",
        port: 465,
        // secure: true, // true for 465, false for other ports
        auth: config.mail163,
      },
      defaults: {
        from: '"闪光" <jonsnowprince@163.com>',
      },
      template: {
        dir: __dirname + '../../static/views',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [DemoController],
  providers: [DemoService],
})
export class FeatureModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
