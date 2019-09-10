import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CarsService } from './cars.service';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { TokenGuard } from '../../common/guards/token.guard';
@UseGuards(TokenGuard, RolesGuard)
@Controller('cars')
export class CarsController {
  constructor(private readonly catsService: CarsService) {}
  @Get('details/:id')
  @Roles('admin')
  async findOne(@Param() params): Promise<object> {
    return this.catsService.findOne(params.id);
  }
  @Get('list')
  @Roles('user')
  async getList(): Promise<object> {
    return this.catsService.getList();
  }
}
