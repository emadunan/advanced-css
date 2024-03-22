import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() currentUser: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(currentUser, response);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    await this.authService.logout(response);
  }
}
