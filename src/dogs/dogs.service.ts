import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class DogsService {
  private readonly dogs: Cat[] = [];

  create(dog: Cat) {
    this.dogs.push(dog);
  }

  findAll(): string {
    return 'this.dogs';
  }
}
