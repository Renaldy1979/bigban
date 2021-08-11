import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import User from '../../typeorm/entities/User';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  roles: string;
  permissions: string;
}

async function decoder(request: Request): Promise<User | undefined> {
  const authHeader = request.headers.authorization;
  const userRepository = new UsersRepository();

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401, 'token.invalid');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id, roles } = verify(
      token,
      authConfig.jwt.secret,
    ) as ITokenPayload;

    const user = await userRepository.findById(user_id);

    request.user = {
      id: user_id,
      roles,
    };
    return user;
  } catch {
    throw new AppError('JWT token is not valid', 401, 'token.invalid');
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function is(roles: string[]) {
  const roleAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const user = await decoder(request);
    // return next();
    const userRoles = user?.roles.map(role => role.name);

    const existsRoles = userRoles?.some(r => roles.includes(r));

    if (existsRoles) {
      return next();
    }

    return next();
    // throw new AppError('Not authorized!');
  };

  return roleAuthorized;
}
