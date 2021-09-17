import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigurationKeys } from 'src/config/configuration.keys';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(_configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      ignoreExpiration: false,
      secretOrKey: _configService.get<string>(ConfigurationKeys.JWT_SECRET),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}