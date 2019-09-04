import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { EntityManager, InsertResult, Repository } from 'typeorm'
import * as URL from 'url'
import { Logger } from '../../shared/utils/logger'

@Injectable()
export class DemoService {
  async getDemo(): Promise<string> {
    Logger.log(`getDemo request`)
    return 'getDemo request success'
  }
  async postDemo(): Promise<string> {
    Logger.log(`postDemo request`)
    return 'postDemo request success'
  }
}
