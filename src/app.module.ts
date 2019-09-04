import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { RedisModule } from 'nestjs-redis';
import { AppController } from './app.controller';
@Module({
  imports: [
    CatsModule,
    DogsModule,
    RedisModule.register({
      name: 'test1',
      url: 'redis://127.0.0.1:6379',
    }),
  ],
  controllers: [AppController],
})
export class ApplicationModule {}
