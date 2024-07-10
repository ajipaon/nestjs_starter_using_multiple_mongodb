import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/auth.dto';
import { User } from 'src/entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JsonResponse } from 'src/model/jsonresponse.model';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDto: RegisterDto,
    res: Response,
  ): Promise<JsonResponse<User>> {
    const oldUser = await this.userService.findByEmail(registerDto.email);
    let user = new User();
    if (oldUser) {
      user = this.updateTOUser(oldUser, registerDto);
    } else {
      user = await this.convertTOUser(registerDto);
    }
    const result = await this.userService.save(user);
    const payload = {
      produce: 'AUTH',
      id: result.id,
      authName: result.authName,
      expiredAuth: result.expiresAuth,
      first: result.credential.firstLogin,
      role: result.role,
    };
    const token = this.jwtService.sign({ data: payload });
    res.setHeader('Authorization', `Bearer ${token}`);

    return {
      data: result,
    };
  }

  async login(registerDto: RegisterDto): Promise<JsonResponse<User>> {
    const oldUser = await this.userService.findByEmail(registerDto.email);
    let user = new User();
    if (oldUser) {
      user = this.updateTOUser(oldUser, registerDto);
    } else {
      user = await this.convertTOUser(registerDto);
    }
    const result = await this.userService.save(user);

    return {
      data: result,
    };
  }

  private async convertTOUser(registerDto: RegisterDto): Promise<User> {
    const user = new User();

    user.authId = registerDto.id;
    user.name = registerDto.displayName;
    user.email = registerDto.email;
    user.photoUrl = registerDto.photoUrl;
    user.authId = registerDto.idToken;
    user.serverAuthCode = registerDto.serverAuthCode;
    user.authName = registerDto.authName;
    user.grantedScopes = registerDto.grantedScopes;
    user.expiresAuth = registerDto.expiresAt;
    user.credential.password = await bcrypt.hash('123456', 10);

    return user;
  }

  private updateTOUser(user: User, registerDto: RegisterDto): User {
    user.authId = registerDto.id;
    user.name = registerDto.displayName;
    user.email = registerDto.email;
    user.photoUrl = registerDto.photoUrl;
    user.authId = registerDto.idToken;
    user.serverAuthCode = registerDto.serverAuthCode;
    user.authName = registerDto.authName;
    user.grantedScopes = registerDto.grantedScopes;
    user.expiresAuth = registerDto.expiresAt;

    return user;
  }
}
