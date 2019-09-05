import { Injectable } from '@nestjs/common';
import { IUserLoginInfo } from './interfaces/login.interface';
import { RedisService } from 'nestjs-redis';
@Injectable()
export class LoginService {
  private readonly redisService: RedisService;
  constructor(redisService: RedisService) {
    this.redisService = redisService;
  }
  async userLogin(userInfo: IUserLoginInfo): Promise<boolean> {
    const client = await this.redisService.getClient();
    const result = await client.set(
      userInfo.username,
      JSON.stringify(userInfo),
    );
    if (result === 'OK') {
      return true;
    } else {
      return false;
    }
  }
}
