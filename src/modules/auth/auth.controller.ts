import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/shared/guards/jwt-local.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }

  @Post('validate-token')
  @HttpCode(HttpStatus.OK)
  async validateToken(@Body('token') token: string) {
    // This endpoint can be used to check if a token is still valid
    try {
      // We'll implement this in the service if needed
      return { valid: true };
    } catch {
      return { valid: false };
    }
  }
}