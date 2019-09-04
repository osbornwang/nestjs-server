import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsEmail } from 'class-validator'

import { CommonEntity } from '../../../shared/entities/common.entity'

@Entity('user')
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  role_id: number

  @Column({
    length: 50,
    unique: true,
  })
  openid: string

  @Column({
    type: 'char',
    length: 20,
    default: '',
  })
  nickname: string

  @Column({
    length: 200,
    default: '',
  })
  avatar: string

  @Column({
    length: 100,
    default: '',
  })
  self_introduction: string

  @Column()
  points: number

  @Column({
    default: null,
  })
  gender: number

  @Column({
    type: 'varchar',
    length: 50,
    default: '',
  })
  @IsEmail()
  email: string

  @Column({
    type: 'varchar',
    length: 50,
    default: '',
  })
  status: string

  @Column({
    length: 24,
  })
  wx_session_key: string

  @Column({
    length: 14,
  })
  phone_number: string
}
