import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { TokenGuard } from '../../common/guards/token.guard';
@UseGuards(TokenGuard)
@Controller('auth')
export class AuthController {
  @Get('userInfo')
  getProfile(@Request() req) {
    return req.user;
  }
}
