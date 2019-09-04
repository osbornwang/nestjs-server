import { ApiModelProperty } from '@nestjs/swagger'
import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator'

export class GetUserInfoDto {
  @ApiModelProperty()
  @IsString()
  readonly code: string
}

export class UpdateUserInfoDto {
  @ApiModelProperty()
  @IsString()
  @MaxLength(200)
  readonly avatar: string

  @ApiModelProperty()
  readonly gender: number

  @ApiModelProperty()
  readonly id: number

  @ApiModelProperty()
  @IsString()
  @MaxLength(20)
  readonly nickname: string

  @ApiModelProperty()
  @IsString()
  @MaxLength(100)
  readonly self_introduction: string

  @ApiModelProperty()
  @IsOptional()
  @IsString()
  @Length(11)
  @IsOptional()
  readonly phone_number?: string

  @ApiModelProperty()
  readonly user_tag_ids?: number[]
}

export class SearchUserDto {
  @ApiModelProperty()
  @IsNumber()
  readonly limit: number

  @ApiModelProperty()
  @IsNumber()
  readonly offset: number

  @ApiModelProperty()
  @IsString()
  readonly nickname_keyword: string
}

export class RecordOldUserDto {
  @ApiModelProperty()
  @IsNumber()
  readonly old_user_id: number

  @ApiModelProperty()
  @IsNumber()
  readonly user_id: number
}

export class PhoneNumberDto {
  @ApiModelProperty()
  @IsString()
  readonly iv: string

  @ApiModelProperty()
  @IsString()
  readonly encryptedData: string
}

export class GetUserRelatedCommunityDto {
  @ApiModelProperty()
  readonly user_id: number
}
