import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly redisService: RedisService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { headers } = request;
      const authToken = headers.authorization.split('Bearer ')[1];
      const userInfo = JSON.parse(
        await this.redisService.getClient().get(authToken),
      );
      if (userInfo) {
        request.user = userInfo;
        return true;
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
