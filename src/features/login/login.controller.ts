import { Controller, Body, Post, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { LoginService } from './login.service';
import { IUserLoginInfo } from './interfaces/login.interface';
@Controller('login')
@UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  async userLogin(@Body() params: IUserLoginInfo): Promise<boolean> {
    return this.loginService.userLogin(params);
  }
}
