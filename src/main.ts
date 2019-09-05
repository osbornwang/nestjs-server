import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ExceptionsFilter } from './common/filters/errors.filter';
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new ExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
