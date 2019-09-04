import { Injectable } from '@nestjs/common'
import { Cron, NestSchedule } from 'nest-schedule'
import { Logger } from './shared/utils/logger'
@Injectable()
export class ScheduleService extends NestSchedule {
  // execute job on every day 3:30 PM
  @Cron('0 30 15 * * *', {})
  async cronJob() {
    Logger.log('executing cron job')
  }
}
