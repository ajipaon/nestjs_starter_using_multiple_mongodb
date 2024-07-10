import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 345345345, description: 'id google auth' })
  @IsString()
  readonly id: string;

  @ApiProperty({ example: 'google', description: 'jenis athentikasi login' })
  @IsString()
  readonly authName: 'google' | 'yahoo' = 'google';

  @ApiProperty({ example: 'example', description: 'nama user' })
  @IsString()
  readonly displayName: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'email' })
  @IsInt()
  readonly email: string;

  @ApiProperty({
    example: 'https://google.com/image.png',
    description: 'email',
  })
  @IsString()
  readonly photoUrl: string;

  @ApiProperty({
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2MzQ4ODZkYzE1YjcwMmEwNzM1',
    description: 'token',
  })
  @IsString()
  readonly idToken: string;

  @ApiProperty({
    example: '4/0AY0e-g7MdxfgAodLF3kED6cF3DQ',
    description: 'serverAuthCode',
  })
  @IsString()
  readonly serverAuthCode: string;

  @ApiProperty({
    example: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    description: 'grantedScopes',
  })
  @IsArray()
  readonly grantedScopes: [];

  @ApiProperty({
    example: 1599170275000,
    description: 'expiresAt',
  })
  @IsInt()
  readonly expiresAt: number;
}

export class ResponseAuthDto {
  public access_token?: string;
}
