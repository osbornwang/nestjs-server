import { IDbGlobal } from '../../../shared/interfaces/db-global.interface'
import { Token } from '../../authentication/interfaces/jwt-payload.interface'
export interface GetUserInfoResponse {
  user_info: User
  new_user: boolean
  token: Token
}

export interface User {
  id: number
  role_id: number
  nickname: string
  avatar: string
  self_introduction: string
  points: number
  gender: number
  status: string
  email: string
  phone_number: string
}

export interface IDbUser extends IDbGlobal {
  id: number
  role_id: number
  nickname: string
  avatar: string
  self_introduction: string
  points: number
  gender: number
  openid: string
  status: string
  email: string
  wx_session_key: string
  phone_number: string
}

export interface UpdateUserInfoResponse {
  user_info: User
}

export interface SearchUserResponse {
  total: number
  users: User[]
}

export interface Community {
  name: string
  description?: string
  logo?: string
}

export interface GetUserRelatedCommunityResponse {
  communities: Community[]
}
