import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users/users.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
import { config } from '../config';
@Module({
  imports: [RedisModule.register(config.redisConfig)],
  controllers: [LoginController, AuthController, CarsController],
  providers: [LoginService, AuthService, CarsService, UsersService],
})
export class FeatureModule {}
