import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { sign, verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { add } from 'date-fns';
import Roles from '@modules/users/infra/typeorm/entities/Role';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersTokensRepository from '../repositories/IUsersTokensRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface IPayload {
  sub: string;
  email: string;
  roles: string[];
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
  roles: Roles[];
  user: User;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(
      token,
      authConfig.jwt.secretRefreshToken,
    ) as IPayload;
    const user_id = sub;

    const user_token = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    );

    if (!user_token) {
      throw new AppError('Refresh token does not exists.');
    }

    await this.usersTokensRepository.deleteById(user_token.id);

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User  does not exists.');
    }
    const { roles } = user;

    const refresh_token = sign(
      { email, roles },
      authConfig.jwt.secretRefreshToken,
      {
        subject: sub,
        expiresIn: authConfig.jwt.expiresInRefreshToken,
      },
    );

    const expires_date = add(new Date(), {
      days: authConfig.jwt.expiresInRefreshTokenDays,
    });

    await this.usersTokensRepository.generate({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({ email, roles }, authConfig.jwt.secret, {
      subject: user_id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, roles, refresh_token, token: newToken };
  }
}

export default RefreshTokenService;
