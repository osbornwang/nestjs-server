import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.hasRole(roles, user.role);
  }

  hasRole(apiLimit: string[], userAuth: string): boolean {
    if (userAuth === 'admin') {
      return true;
    }
    return apiLimit.includes(userAuth);
  }
}
