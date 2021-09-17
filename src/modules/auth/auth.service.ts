import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationKeys } from 'src/config/configuration.keys';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private _configService: ConfigService
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const secret = this._configService.get<string>(ConfigurationKeys.JWT_SECRET);
    return {
      accessToken: this.jwtService.sign(payload,{secret})
    }
  }
}