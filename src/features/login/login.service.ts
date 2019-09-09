import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private readonly jwtService: JwtService) {}
  async login(user: any) {
    const payload = {
      username: user.username,
      userId: user.userId,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
