import jwt from "jsonwebtoken";
import { Repository } from "typeorm";

import { shopDataSource } from "../db";
import { Token } from "../entities/token";
import { UserDto } from "../dto/userDto";

class TokenService {
  readonly tokenRepo: Repository<Token>;

  constructor() {
    this.tokenRepo = shopDataSource.getRepository(Token);
  }

  generateTokens(payload: UserDto) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string): UserDto | null {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
      return userData as UserDto;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): UserDto | null {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
      return userData as UserDto;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: number, refreshToken: string) {
    const tokenData = await this.tokenRepo.findOne({
      where: { user: { id: userId } },
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return this.tokenRepo.save(tokenData);
    }
    const token = await this.tokenRepo.create({ userId, refreshToken });
    return this.tokenRepo.save(token);
  }

  async removeToken(refreshToken: string) {
    const tokenData = await this.tokenRepo.delete({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: string) {
    const tokenData = await this.tokenRepo.findOne({ where: { refreshToken } });
    return tokenData;
  }
}

export const tokenService = new TokenService();
