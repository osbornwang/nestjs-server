import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ExceptionsFilter } from './common/filters/errors.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { config } from './config';
import { Logger } from './common/middleware/logger';
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(config.port, config.hostName, () => {
    Logger.log(
      `nest demo server has been started on http://${config.hostName}:${
        config.port
      }`,
    );
  });
}
bootstrap();
