import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from 'src/entity/user.entity';

@UseGuards(JwtAuthGuard)
@ApiTags('user')
@Controller('api/user')
export class UserController {
  @Get()
  getUser(@Request() req: any): Promise<User> {
    const user = req.user;
    return user;
  }
}
