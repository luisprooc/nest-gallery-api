import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';
import {ConfigurationKeys} from '../../config/configuration.keys';

@Injectable()
export class DatabaseProviders {
  constructor(private readonly _configService: ConfigService){}

  useFactory = async () => await createConnection({
    type: 'mysql',
    host: this._configService.get<string>(ConfigurationKeys.DB_HOST),
    port: this._configService.get<number>(ConfigurationKeys.DB_PORT),
    username: this._configService.get<string>(ConfigurationKeys.DB_USERNAME),
    password: this._configService.get<string>(ConfigurationKeys.DB_PASSWORD),
    database: this._configService.get<string>(ConfigurationKeys.DB_NAME),
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
  })
}

