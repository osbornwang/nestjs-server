import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { AuthenticationInterceptor } from '../../common/interceptors/authentication.interceptor';
import { CarsService } from './cars.service';

@Controller('cars')
@UseInterceptors(AuthenticationInterceptor)
export class CarsController {
  constructor(private readonly catsService: CarsService) {}
  @Get('details/:id')
  async findOne(@Param() params): Promise<object> {
    return this.catsService.findOne(params.id);
  }
}
