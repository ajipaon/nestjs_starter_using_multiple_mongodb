import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';
import { RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JsonResponse } from 'src/model/jsonresponse.model';
import { Response } from 'express';

@ApiTags('auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
