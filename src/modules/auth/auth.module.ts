import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from 'src/shared/strategy/jwt.local.strategy';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
        signOptions: { 
          expiresIn: configService.get('JWT_ACCESS_EXPIRATION') || '15m' 
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy], // ← Add LocalStrategy here
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}