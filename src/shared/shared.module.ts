import { Global, HttpModule, Module } from '@nestjs/common'

import { WechatService } from './services/wechat/wechat.service'

const SERVICES = [WechatService]

@Global()
@Module({
  imports: [HttpModule],
  providers: [...SERVICES],
  exports: [...SERVICES],
})
export class SharedModule {}
