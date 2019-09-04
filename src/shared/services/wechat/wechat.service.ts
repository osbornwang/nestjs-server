import { HttpService, Injectable } from '@nestjs/common'

import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

import config from '../../../config'

export type WXSession = {
  openid: string
  session_key: string
}

@Injectable()
export class WechatService {
  constructor(private readonly httpService: HttpService) {}

  // https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/code2Session.html
  getWXSession(code: string): Observable<WXSession> {
    return this.httpService
      .get('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
          appid: config.AppID,
          grant_type: 'authorization_code',
          js_code: code,
          secret: config.AppSecret,
        },
      })
      .pipe(map(res => res.data))
  }
}
