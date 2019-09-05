import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { RedisService } from 'nestjs-redis';
@Injectable()
export class AuthenticationInterceptor implements NestInterceptor {
  private readonly redisService: RedisService;
  constructor(redisService: RedisService) {
    this.redisService = redisService;
  }
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const args = context.getArgs();
    const {
      headers,
      headers: { token = '' },
    } = args[0];
    const client = await this.redisService.getClient();
    const result = await client.get(token);
    if (!token || !result) {
      console.log(`Identity verification failed ${new Date()}`);
      throw new UnauthorizedException();
    }
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Identity verification passed ${new Date()}`)),
      );
  }
}
