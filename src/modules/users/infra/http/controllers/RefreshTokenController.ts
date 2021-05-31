import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowProfileService from '@modules/users/services/RefreshTokenService';
import { classToClass } from 'class-transformer';

export default class RefreshTokenController {
  public async create(request: Request, response: Response): Promise<Response> {
    const requestToken =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token;

    const refreshTokenService = container.resolve(ShowProfileService);

    const {
      user,
      token,
      refresh_token,
      roles,
    } = await refreshTokenService.execute(requestToken);

    return response.json({
      user: classToClass(user),
      token,
      refresh_token,
      roles,
    });
  }
}
