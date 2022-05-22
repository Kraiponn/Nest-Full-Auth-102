import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { AuthDto } from './dto';
import { JwtPayload, Tokens } from './types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  /****************************
   * Helper functions
   */
  hashData(data: string): Promise<string> {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('ACCESS_TOKEN_SECRET_KEY'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('REFRESH_TOKEN_SECRET_KEY'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updatehashedRt(userId: number, rt: string) {
    const hash = await this.hashData(rt);

    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        hashedRt: hash,
      },
    });
  }

  /****************************
   * Sign Up :56.25
   */
  async signupLocal({ email, password }: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          email,
          hash,
        },
      });

      const tokens = await this.getTokens(user.id, user.email);
      await this.updatehashedRt(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  /****************************
   * Sign In
   */
  async signinLocal({ email, password }: AuthDto): Promise<Tokens> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) throw new ForbiddenException('Access denied');

    const pwMatches = await bcrypt.compare(password, user.hash);
    if (!pwMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updatehashedRt(user.id, tokens.refresh_token);

    return tokens;
  }

  /****************************
   * Log Out
   */
  async logout(userId: number) {
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  /****************************
   * Refresh Token
   */
  async refreshTokens(userId: number, rt: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user || !user.hashedRt) throw new ForbiddenException('Access denied');

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updatehashedRt(user.id, tokens.refresh_token);

    return tokens;
  }
}
