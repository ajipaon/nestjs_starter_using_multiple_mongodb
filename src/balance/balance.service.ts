import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Balance } from 'src/entity/balance.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Balance, 'balanceConnection')
    private readonly balanceRepository: MongoRepository<Balance>,
  ) {}

  async findbyId(id: string): Promise<Balance> {
    return await this.balanceRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
  }

  async findbyUserId(id: string): Promise<Balance> {
    const balance = await this.balanceRepository.findOne({
      where: { userId: id },
    });
    if (!balance) {
      const newBalance = new Balance();
      newBalance.userId = new ObjectId(id);

      return this.createBalance(newBalance);
    }
    return balance;
  }

  private async createBalance(balance: Balance): Promise<Balance> {
    return await this.balanceRepository.save(balance);
  }
}
