import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginService } from './login.service';
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Request() req) {
    return this.loginService.login(req.user);
  }
}
