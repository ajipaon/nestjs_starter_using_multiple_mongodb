import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private rolesGuard: RolesGuard) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthValid = await super.canActivate(context);
    if (!isAuthValid) {
      return false;
    }

    return this.rolesGuard.canActivate(context);
  }
}
