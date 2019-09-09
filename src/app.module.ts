import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from 'nestjs-redis';
import { LoginModule } from './features/login/login.module';
import { CarsModule } from './features/cars/cars.module';
import { config } from './config/index';
@Module({
  imports: [LoginModule, CarsModule, RedisModule.register(config.redisConfig)],
  providers: [AppService],
  exports: [AppService],
  controllers: [AppController],
})
export class ApplicationModule {}
