import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';
import { RtGuard } from './common/guards';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /****************************
   * @route   /auth/local/signup
   * @desc    Sign Up
   * @access  Public
   */
  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(body);
  }

  /****************************
   * @route   /auth/local/signin
   * @desc    Sign In
   * @access  Public
   */
  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(body);
  }

  /****************************
   * @route   /auth/logout
   * @desc    Sign out from system
   * @access  Private
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  /****************************
   * @route   /auth/refresh
   * @desc    Request the new tokens by using refresh token key
   * @access  Private
   */
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
