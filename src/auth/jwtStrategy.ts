import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constans';
import { JwtPayload } from 'src/model/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      algorithms: 'HS256'
    });
  }

  async validate({ data }: JwtPayload) {
    // const user = await this.userService.findbyId(data.id);
    const user = data;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
