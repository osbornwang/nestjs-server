import { Module } from '@nestjs/common';
import { UserController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [],
  providers: [LoginService],
  controllers: [UserController],
})
export class LoginModule {}
