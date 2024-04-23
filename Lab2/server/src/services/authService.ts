import bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { User } from "../entities/user";
import { shopDataSource } from "../db";
import { ApiError } from "../exceptions/apiError";
import { tokenService } from "./tokenService";
import { UserDto } from "../dto/userDto";

class AuthService {
  readonly userRepo: Repository<User>;

  constructor() {
    this.userRepo = shopDataSource.getRepository(User);
  }

  async registration(email: string, password: string) {
    const isExist = await this.userRepo.findOne({ where: { email } });
    if (isExist) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.userRepo.create({ email, password: hashPassword });
    const createdUser = await this.userRepo.save(user);

    const userDto = new UserDto(createdUser);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest(
        "User with this email and password does not exist"
      );
    }
    const isPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordsMatch) {
      throw ApiError.BadRequest(
        "User with this email and password does not exist"
      );
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await this.userRepo.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user!);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
}

export const authService = new AuthService();
