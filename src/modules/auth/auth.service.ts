import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UsersService } from '../user/user.service';
// import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Find user by email
    const user = await this.usersService.findByEmail(email);
    
    // Check if user exists and password matches
    if (user && await bcrypt.compare(password, user.password)) {
      // Remove password from returned user object
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateAccessToken(user: any): Promise<string> {
    const payload = { 
      email: user.email, 
      sub: user.id,
      fullName: user.fullName 
    };
    
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(user: any): Promise<string> {
    const payload = { 
      sub: user.id,
      type: 'refresh' 
    };
    
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION') || '7d',
    });
  }

  async login(user: any) {
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    
    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async register(createUserDto: CreateUserDto) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
    
    // Create user with hashed password
    const user = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Return login response (tokens + user info)
    return this.login(user);
  }

  async refreshTokens(refreshToken: string) {
    try {
      // Verify the refresh token
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      // Check if it's a refresh token
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      // Get user from database
      const user = await this.usersService.findById(payload.sub);
      
      if (!user || !user.isActive) {
        throw new UnauthorizedException('User not found or inactive');
      }

      // Generate new tokens
      const newAccessToken = await this.generateAccessToken(user);
      const newRefreshToken = await this.generateRefreshToken(user);

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}