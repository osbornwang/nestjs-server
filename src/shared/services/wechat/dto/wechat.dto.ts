import { ApiModelProperty } from '@nestjs/swagger'

export class WechatDto {
  @ApiModelProperty()
  readonly openid: string

  @ApiModelProperty()
  readonly session_key: string

  @ApiModelProperty()
  readonly unionid: string

  @ApiModelProperty()
  readonly errcode: string

  @ApiModelProperty()
  readonly errMsg: string
}
