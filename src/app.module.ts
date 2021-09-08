import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import Configuration from './config/configuration';
import { ConfigurationKeys } from './config/configuration.keys'
import { DatabaseModule } from './modules/database/database.module';
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [Configuration]
  }), DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number;

  constructor(private readonly _configService: ConfigService)
  {
    AppModule.port = this._configService.get<number>(ConfigurationKeys.PORT);
  }
}
