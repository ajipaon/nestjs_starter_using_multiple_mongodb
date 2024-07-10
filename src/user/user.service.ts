import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User, 'userConnection')
    private readonly userRepository: MongoRepository<User>,
  ) {}

  async save(user: User): Promise<User> {
    return this.userRepository.save(user);

    // const payload = { _id: user.username, sub: user.userId };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findbyId(id: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
