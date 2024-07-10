import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/entity/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('user')
@Controller('api/user')
export class UserController {
  @Get()
  @Roles('ROLE_ADMIN','ROLE_SUPER_ADMIN','ROLE_USER')
  getUser(@Request() req: any): Promise<User> {
    const user = req.user;
    return user;
  }
}
