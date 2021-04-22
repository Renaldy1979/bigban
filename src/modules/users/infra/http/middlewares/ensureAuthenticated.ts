import { getCustomRepository } from 'typeorm';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import UsersRepository from '../../typeorm/repositories/UsersRepository';
import User from '../../typeorm/entities/User';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  roles: string;
}

async function decoder(request: Request): Promise<User | undefined> {
  const authHeader = request.headers.authorization;
  const userRepository = getCustomRepository(UsersRepository);
  if (!authHeader) {
    throw new AppError('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, roles } = decoded as ITokenPayload;

    request.user = {
      id: sub,
      roles,
    };

    const user = await userRepository.findById(sub);

    return user;
  } catch {
    throw new AppError('Invalid JWT token');
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function is(role: string[]) {
  const roleAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const user = await decoder(request);
    return next();

    // eslint-disable-next-line no-shadow
    const userRoles = user?.roles.map(role => role.name);

    const existsRoles = userRoles?.some(r => role.includes(r));

    if (existsRoles) {
      // return next();
    }

    throw new AppError('Not authorized!');
  };

  return roleAuthorized;
}
