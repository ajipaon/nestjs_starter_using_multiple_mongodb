import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseUserModule } from 'src/database/user/databaseuser.module';
import { User } from 'src/entity/user.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@Module({
  imports: [
    DatabaseUserModule,
    TypeOrmModule.forFeature([User], 'userConnection'),
  ],
  controllers: [UserController],
  providers: [UserService,RolesGuard],
  exports: [UserService,],
})
export class UserModule {}
