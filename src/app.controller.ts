import {
  Body,
  Controller,
  Get,
} from '@nestjs/common';
import { TestService } from './app.service';
@Controller('app')
export class AppController {
  constructor(private readonly testService: TestService) {}
  @Get()
  async findAll(): Promise<any> {
    return this.testService.root();
  }
}
