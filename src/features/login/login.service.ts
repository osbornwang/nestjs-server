import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { AuthService } from '../auth/auth.service';
import { config } from '../../config';
import { v4 as uuid } from 'uuid';
import { ILoginInfo } from './interfaces/loginInfo.interface';
@Injectable()
export class LoginService {
  constructor(
    private readonly redisService: RedisService,
    private readonly authService: AuthService,
  ) {}
  async login(userInfo: ILoginInfo) {
    const { username, password } = userInfo;
    const userCheckResult = await this.authService.validateUser(
      username,
      password,
    );
    if (!userCheckResult) {
      throw new UnauthorizedException();
    }
    const accessToken: string = uuid();
    const result = await this.redisService
      .getClient()
      .set(
        accessToken,
        JSON.stringify(userCheckResult),
        'EX',
        config.redisConfig.expirationTime,
      );
    if (result === 'OK') {
      return {
        accessToken,
      };
    }
    throw new BadRequestException();
  }
}
