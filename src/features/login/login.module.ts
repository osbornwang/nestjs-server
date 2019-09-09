import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { AuthService } from '../auth/auth.service';
@Module({
  controllers: [LoginController],
  imports: [AuthService],
})
export class LoginModule {}
