import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { ApiUseTags } from '@nestjs/swagger'
import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'

import { DemoService } from './demo.service'

@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get('getDemo')
  async getDemo(): Promise<string> {
    return await this.demoService.getDemo()
  }

  @Post('postDemo')
  async postDemo(): Promise<string> {
    return await this.demoService.postDemo()
  }
}
