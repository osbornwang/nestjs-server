import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from 'nestjs-redis';
import { LoginModule } from './features/login/login.module';
import { CarsModule } from './features/cars/cars.module';

@Module({
  imports: [
    LoginModule,
    CarsModule,
    RedisModule.register({
      host: '127.0.0.1',
      port: 6379,
    }),
  ],
  providers: [AppService],
  exports: [AppService],
  controllers: [AppController],
})
export class ApplicationModule {}
