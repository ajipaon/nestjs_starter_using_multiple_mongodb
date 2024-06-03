/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      name: 'userConnection',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const prefixName = configService.get<string>('PREFIX_NAME').toLowerCase();
        const appEnv = configService.get<string>('APP_ENV').toLowerCase();
        const dbUser = configService.get<string>('DB_USER');
        const dbname = `${prefixName}_user_${appEnv}`;
        const mongoUri = `${dbUser}/${dbname}?retryWrites=true&w=majority`.trim();

        return {
          type: 'mongodb',
          url: mongoUri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          entities: [User],
          synchronize: true, // Set to false in production
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User], 'userConnection'),
  ],
  exports: [TypeOrmModule],
})

export class DatabaseUserModule {}
