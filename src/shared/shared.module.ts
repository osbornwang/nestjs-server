import { Global, HttpModule, Module } from '@nestjs/common'

const SERVICES = []

@Global()
@Module({
  imports: [HttpModule],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class SharedModule {}
