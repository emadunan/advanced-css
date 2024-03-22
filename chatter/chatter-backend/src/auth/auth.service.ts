import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const expires = new Date();

    expires.setSeconds(
      expires.getSeconds() +
        Number(this.configService.getOrThrow<string>('JWT_EXPIRATION')),
    );

    const tokenPayload: TokenPayload = {
      id: user.id.toString(),
      email: user.email,
    };

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  async logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
