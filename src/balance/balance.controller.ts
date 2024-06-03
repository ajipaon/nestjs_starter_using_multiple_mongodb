import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Balance } from 'src/entity/balance.entity';
import { BalanceService } from './balance.service';

@UseGuards(JwtAuthGuard)
@ApiTags('balance')
@Controller('api/balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}
  @Get()
  getBalance(@Request() req: any): Promise<Balance> {
    const user = req.user;
    return this.balanceService.findbyUserId(user.id);
  }
}
