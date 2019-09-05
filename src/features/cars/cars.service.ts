import { Injectable } from '@nestjs/common';
import { ICar } from './interfaces/cars.interface';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class CarsService {
  private readonly redisService: RedisService;
  constructor(redisService: RedisService) {
    this.redisService = redisService;
  }
  private readonly dogs: ICar[] = [];
  async findOne(carId: string): Promise<object> {
    return {
      key: 'WSPAD-TB9-2018-LincolnNavigatorCHN',
      label: '全新林肯领航员NAVIGATOR',
      name: 'Navigator_2018_LCN2014',
      startingPrice: '1,118,000',
      others: {},
      category: 'SUV',
      models: [
        {
          key: 'YZDCD',
          label: 'NAVIGATOR 总统系列',
          name: 'presidential_Navigator2018_LCN2014',
          startingPrice: '1,218,000',
          others: {},
        },
        {
          key: 'YZCBA',
          label: 'NAVIGATOR 尊耀版',
          name: 'preferred_Navigator2018_LCN2014',
          startingPrice: '1,118,000',
          others: {},
        },
      ],
    };
  }
}
