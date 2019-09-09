import {
  Module,
  HttpModule,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';

import { LoginModule } from './login/login.module';
import { CarsModule } from './cars/cars.module';
import { AuthModule } from './auth/auth.module';
import { LoginController } from './login/login.controller';
import { CarsController } from './cars/cars.controller';

import { AuthService } from './auth/auth.service';
const ENTITIES = [];

@Module({
  imports: [LoginModule, CarsModule, AuthModule],
  controllers: [LoginController, CarsController],
  providers: [AuthService],
})
export class FeatureModule {}
