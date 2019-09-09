import { Module } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users/users.service';
import { LoginService } from './login/login.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { config } from '../config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { LoginController } from './login/login.controller';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.JWTSecret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [LoginController, AuthController],
  providers: [
    JwtStrategy,
    LoginService,
    AuthService,
    LocalStrategy,
    UsersService,
  ],
})
export class FeatureModule {}
