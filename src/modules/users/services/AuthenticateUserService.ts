// import { Role } from '@modules/users/infra/typeorm/entities/Role';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import { add } from 'date-fns';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
  refresh_token: string;
}

interface IConfig {
  secret: string;
  expiresIn: string;
  secretRefreshToken: string;
  expiresInRefreshToken: string;
  expiresInRefreshTokenDays: number;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UsersTokensRepository')
    private UsersTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    const {
      secret,
      expiresIn,
      secretRefreshToken,
      expiresInRefreshToken,
      expiresInRefreshTokenDays,
    } = authConfig.jwt as IConfig;

    const userRoles = user.roles.map(role => role.name).toString();

    const userPermissions = user.roles
      .map(role => {
        return role.permissions.map(permission => permission.name);
      })
      .filter((elem, index, self) => {
        return index === self.indexOf(elem);
      })
      .toString();

    const token = sign(
      { email, roles: userRoles, permissions: userPermissions },
      secret,
      {
        subject: user.id,
        expiresIn,
      },
    );

    const refresh_token = sign(
      { email, roles: userRoles, permissions: userPermissions },
      secretRefreshToken,
      {
        subject: user.id,
        expiresIn: expiresInRefreshToken,
      },
    );

    const refresh_token_expires_date = add(new Date(), {
      days: expiresInRefreshTokenDays,
    });

    await this.UsersTokensRepository.generate({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return {
      user,
      token,
      refresh_token,
    };
  }
}

export default AuthenticateUserService;
