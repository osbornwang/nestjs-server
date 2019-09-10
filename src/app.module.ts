import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { FeatureModule } from './features/feature.module';
@Module({
  imports: [FeatureModule],
  providers: [AppService],
  exports: [AppService],
  controllers: [],
})
export class ApplicationModule {}
