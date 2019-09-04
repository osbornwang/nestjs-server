import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as helmet from 'helmet'
import * as ServeStatic from 'serve-static'
import { AppModule } from './app.module'
import { ExceptionsFilter } from './core/filter/errors.filter'
import config from './config'
import { Logger } from './shared/utils/logger'
import { logger } from './core/middleware/logger.middleware'
import { TransformInterceptor } from './core/interceptor/transform.interceptor'
import { resolve, join } from 'path'
import { ValidationPipe } from './core/pipe/validation.pipe'

const API_PREFIX = 'api/v1'

declare const module: any

async function initSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Flash')
    .setDescription('The Flash API Documents')
    .setBasePath(API_PREFIX)
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)
  // swagger 地址: http://${config.hostName}:${config.port}/docs
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  })
  // app.setGlobalPrefix(API_PREFIX)
  // await initSwagger(app)
  app.use(helmet())
  app.use(logger)
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(config.port, config.hostName, () => {
    Logger.log(
      `Lincoln API server has been started on http://${config.hostName}:${config.port}`,
    )
  })
}

bootstrap()
