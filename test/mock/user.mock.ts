import * as Mock from 'mockjs'
import { Observable, of } from 'rxjs'
import { WXSession } from '../../src/shared/services/wechat/wechat.service'
import { UserTagMock } from './tag.mock'

export const CommonUserMock = Mock.mock({
  'id|1-10': 1,
  role_id: 0,
  'nickname|1': ['@cname', '@name'],
  avatar: '@url',
  'self_introduction|1': ['@title(5)', '@ctitle(5)'],
  points: 0,
  'gender|1': [1, 2],
  'status|1': ['VERIFIED', 'PENDING', 'CANCELED'],
  email: '@email',
  'phone_number|11-11': 1,
  ...UserTagMock,
})

export const UserMock = Mock.mock({
  ...CommonUserMock,
  openid: '@id',
  create_time: '@date',
  update_time: '@date',
})

export const UserResponseMock = Mock.mock({
  new_user: false,
  user_info: CommonUserMock,
  token: null,
})

export const UpdatedUserInfoMock = Mock.mock({
  avatar: '@url',
  'gender|1': [1, 2],
  'id|1-10': 1,
  'nickname|1': ['@cname', '@name'],
  'self_introduction|1': ['@title(5)', '@ctitle(5)'],
})

export const ChangedMockUserResponseMock = Mock.mock({
  user_info: CommonUserMock,
})

export const WXSessionMock: Observable<WXSession> = of(
  Mock.mock({
    openid: '@id',
    session_key: '@id',
  }),
)
