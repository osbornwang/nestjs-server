import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload, Token } from './interfaces/jwt-payload.interface'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../demo/entity/demo.entity'
import { config } from '../../config'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createToken(user: JwtPayload): Token {
    const accessToken = this.jwtService.sign(user)
    return {
      expires_in: config.JWTExpiresIn,
      access_token: accessToken,
    }
  }

  async validateUser(payload: JwtPayload): Promise<boolean> {
    // 数据库是否存在该 ID
    const results = await this.userRepository.findByIds([payload.userId])
    return results.length > 0
  }
}
