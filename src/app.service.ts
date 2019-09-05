import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}
  test(): boolean {
    return true;
  }
  async root(): Promise<boolean> {
    const client = await this.redisService.getClient();
    return true;
  }
}
