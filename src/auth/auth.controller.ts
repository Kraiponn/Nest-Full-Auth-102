import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /****************************
   * Sign Up
   */
  @Post('/local/signup')
  signup(@Body() body: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(body);
  }

  /****************************
   * sign In
   */
  @Post('/local/signin')
  signin() {
    return this.authService.signinLocal();
  }

  /****************************
   * Log Out
   */
  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  /****************************
   * Refresh Token
   */
  @Post('/refresh')
  refreshToken() {
    return this.authService.refreshToken();
  }
}
