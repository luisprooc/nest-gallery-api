import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'pg';
import {ConfigurationKeys} from '../../config/configuration.keys';


export const DatabaseProviders = [
  TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject: [ConfigService],
    async useFactory(_configService: ConfigService){
      return {
        type: 'postgres',
        host: _configService.get<string>(ConfigurationKeys.DB_HOST),
        port: _configService.get<number>(ConfigurationKeys.DB_PORT),
        username: _configService.get<string>(ConfigurationKeys.DB_USERNAME),
        password: _configService.get<string>(ConfigurationKeys.DB_PASSWORD),
        database: _configService.get<string>(ConfigurationKeys.DB_NAME),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
      } as ConnectionOptions;
    }
  }),
]

