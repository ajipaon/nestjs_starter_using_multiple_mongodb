import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabalanceModule } from 'src/database/balance/databasebalance.module';
import { Balance } from 'src/entity/balance.entity';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [
    DatabalanceModule,
    TypeOrmModule.forFeature([Balance], 'balanceConnection'),
  ],
  controllers: [BalanceController],
  providers: [BalanceService, RolesGuard],
})
export class BalanceModule {}
