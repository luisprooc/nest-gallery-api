import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import Configuration from './config/configuration';
import { ConfigurationKeys } from './config/configuration.keys'
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';
import { PhotoModule } from './modules/photo/photo.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    load: [Configuration]
    }), 
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get<number>(ConfigurationKeys.THROTTLE_TTL),
        limit: config.get<number>(ConfigurationKeys.THROTTLE_LIMIT),
      }),
    }),
    DatabaseModule, 
    UserModule, 
    PhotoModule,
    AuthModule
],
})
export class AppModule {
  static port: number;

  constructor(private readonly _configService: ConfigService)
  {
    AppModule.port = this._configService.get<number>(ConfigurationKeys.PORT);
  }
}
