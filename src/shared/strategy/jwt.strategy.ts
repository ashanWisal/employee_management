import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/modules/user/user.service';
import { User } from 'src/modules/user/entities/user.entity';

interface JwtPayload {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET') || '',
    });
  }

  async validate(payload: JwtPayload): Promise<Omit<User, 'password'> | null> {
    const userId = Number(payload.sub);
    if (isNaN(userId)) {
      return null;
    }

    const user = await this.usersService.findById(userId);

    if (!user || !user.isActive) {
      return null;
    }

    const { password: _password, ...result } = user;
    return result;
  }
}
