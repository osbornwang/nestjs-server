import { Body, Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticationInterceptor } from './common/interceptors/authentication.interceptor';
@Controller('app')
export class AppController {
  private readonly appService: AppService;
  constructor(appService: AppService) {
    this.appService = appService;
  }
  @Get()
  test(): boolean {
    return this.appService.test();
  }
  @Get('test')
  root(): Promise<boolean> {
    return this.appService.root();
  }
}
