import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseUserModule } from 'src/database/user/databaseuser.module';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [
    DatabaseUserModule,
    TypeOrmModule.forFeature([User], 'userConnection'),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
