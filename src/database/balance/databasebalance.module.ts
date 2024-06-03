/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from 'src/entity/balance.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      name: 'balanceConnection',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const prefixName = configService.get<string>('PREFIX_NAME').toLowerCase();
        const appEnv = configService.get<string>('APP_ENV').toLowerCase();
        const dbUser = configService.get<string>('DB_BALANCE');
        const dbname = `${prefixName}_balance_${appEnv}`;
        const mongoUri = `${dbUser}/${dbname}?retryWrites=true&w=majority`.trim();

        return {
          type: 'mongodb',
          url: mongoUri,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          entities: [Balance],
          synchronize: true, // Set to false in production
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Balance], 'balanceConnection'),
  ],
  exports: [TypeOrmModule],
})

export class DatabalanceModule {}
