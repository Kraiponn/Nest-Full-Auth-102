import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /****************************
   * Sign Up
   */
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(body);
  }

  /****************************
   * sign In
   */
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(body);
  }

  /****************************
   * Log Out
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user['id']);
  }

  /****************************
   * Refresh Token : 1:11
   */
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken() {
    return this.authService.refreshToken();
  }
}
