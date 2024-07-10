import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';
import { RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JsonResponse } from 'src/model/jsonresponse.model';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';

// import { ObjectId } from 'mongodb';

@ApiTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private jwtService: JwtService,) {}

  @Post('signup')
  @ApiOperation({ summary: 'user register' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  @HttpCode(200)
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ): Promise<Response<any>> {
    const result = await this.authService.register(registerDto, res);
    return res.json(result);
  }

  @Get('generate/token')
  @HttpCode(200)
  async generateToken(@Res() res: Response): Promise<void> {
    const objectId = new ObjectId().toHexString()
    const payload = {
      produce: 'AUTH',
      id: objectId,
      authName: "auth",
      first: "jaja samidi",
      role: ["ROLE_USER"],
    };
    const token = this.jwtService.sign({ data: payload });
    res.setHeader('Authorization', `Bearer ${token}`);
    res.send("Token generated successfully");
  }

  @Post('signin')
  @HttpCode(200)
  async login(@Body() registerDto: RegisterDto): Promise<JsonResponse<any>> {
    return this.authService.login(registerDto);
  }

  @Get('logout')
  @HttpCode(200)
  async logout(): Promise<void> {
    return null;
  }
}
