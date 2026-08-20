import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (request) => {
        const bearerToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        if (bearerToken) return bearerToken;

        const cookies = request?.headers?.cookie ?? '';
        return cookies
          .split(';')
          .map((cookie) => cookie.trim())
          .find((cookie) => cookie.startsWith('loviqa_token='))
          ?.slice('loviqa_token='.length);
      },

      secretOrKey: configService.getOrThrow<string>(
        'JWT_SECRET',
      ),
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
