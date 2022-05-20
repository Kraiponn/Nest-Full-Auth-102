import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

import * as bcrypt from 'bcrypt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  /****************************
   * Helper functions
   */
  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  /****************************
   * Sign Up
   */
  async signup({ email, password }: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(password);

    const user = await this.prismaService.user.create({
      data: {
        email,
        hash,
      },
    });

    return { access_token: '', refresh_token: '' };
  }

  /****************************
   * Sign In
   */
  signin() {
    return '';
  }

  /****************************
   * Log Out
   */
  logout() {
    return '';
  }

  /****************************
   * Refresh Token
   */
  refreshToken() {
    return '';
  }
}
