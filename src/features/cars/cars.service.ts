import { Injectable } from '@nestjs/common';
import { ICar } from './interfaces/cars.interface';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class CarsService {
  private readonly redisService: RedisService;
  private readonly carsList: ICar[];
  constructor(redisService: RedisService) {
    this.redisService = redisService;
    this.carsList = [
      {
        id: '1',
        key: 'YZDCD',
        label: 'NAVIGATOR 总统系列',
        name: 'presidential_Navigator2018_LCN2014',
        startingPrice: '1,218,000',
        others: {},
      },
      {
        id: '2',
        key: 'YZCBA',
        label: 'NAVIGATOR 尊耀版',
        name: 'preferred_Navigator2018_LCN2014',
        startingPrice: '1,118,000',
        others: {},
      },
    ];
  }
  async findOne(carId: string): Promise<object> {
    const carsInfo = this.carsList.find(item => {
      return item.id === carId;
    });
    return carsInfo;
  }
  async getList(): Promise<object> {
    return this.carsList;
  }
}
