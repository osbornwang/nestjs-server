import { Controller, Body, Post, Get } from '@nestjs/common';
import { LoginService } from './login.service';
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  async login(@Body() loginInfo) {
    return this.loginService.login(loginInfo);
  }
}
