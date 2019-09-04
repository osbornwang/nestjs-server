import { Module } from '@nestjs/common'
import { ScheduleModule } from 'nest-schedule'
import { FeatureModule } from './feature/feature.module'
import { SharedModule } from './shared/shared.module'
import { ScheduleService } from './schedule.service'
@Module({
  imports: [ScheduleModule.register(), FeatureModule, SharedModule],
  providers: [ScheduleService],
})
export class AppModule {}
