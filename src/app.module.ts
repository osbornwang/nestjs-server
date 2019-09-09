import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RedisModule } from 'nestjs-redis';
import { FeatureModule } from './features/feature.module';
import { config } from './config/index';
@Module({
  imports: [FeatureModule, RedisModule.register(config.redisConfig)],
  providers: [AppService],
  exports: [AppService],
  controllers: [],
})
export class ApplicationModule {}
