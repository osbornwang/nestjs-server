import { User } from '../../feature/demo/interface/demo.interface'
import { UserEntity } from '../../feature/demo/entity/demo.entity'

export function convertIDbUserToUser(user: UserEntity): User {
  const {
    id,
    role_id,
    nickname,
    avatar,
    self_introduction,
    points,
    gender,
    status,
    email,
    phone_number,
  } = user

  return {
    avatar,
    gender,
    id,
    nickname,
    points,
    role_id,
    self_introduction,
    status,
    email,
    phone_number,
  }
}
