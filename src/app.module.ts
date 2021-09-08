import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import Configuration from './config/configuration';
import { ConfigurationKeys } from './config/configuration.keys'
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [Configuration]
  })],
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
