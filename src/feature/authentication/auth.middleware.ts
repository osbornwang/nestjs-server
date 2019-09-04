import { Injectable, NestMiddleware, Inject } from '@nestjs/common'
import { Response } from 'express'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req, res: Response, next) {
    let authorization: string = req.get('authorization')
    if (authorization) {
      authorization = authorization.replace(/^bearer /i, '')
    }
    req.getUserData = () => {
      return authorization ? this.jwtService.decode(authorization) : null
    }
    next()
  }
}
