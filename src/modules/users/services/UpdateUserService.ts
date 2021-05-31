import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name?: string;
  email?: string;
  old_password?: string;
  password?: string;
  roles?: string[];
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
    roles,
  }: IRequest): Promise<User> {
    if (user_id) {
      if (!name && !email && !password && !old_password && !roles) {
        throw new AppError(
          'It is not possible to update without informing the fields',
        );
      }

      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User not found.');
      }

      if (email) {
        const userWithUpdatedEmail = await this.usersRepository.findByEmail(
          email,
        );
        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
          throw new AppError('E-mail already in use.');
        }
        user.email = email;
      }

      if (name) {
        user.name = name;
      }

      if (password && !old_password) {
        throw new AppError('You need inform the old-password to set a new.');
      }

      if (password && old_password) {
        const checkOldPassword = await this.hashProvider.compareHash(
          old_password,
          user.password,
        );

        if (!checkOldPassword) {
          throw new AppError('Old password does not match');
        }
        user.password = await this.hashProvider.generateHash(password);
      }
      if (roles) {
        const existsRoles = await this.rolesRepository.findByIds(roles);

        if (!existsRoles?.length) {
          throw new AppError('Roles not found');
        }
        user.roles = existsRoles;
      }

      return this.usersRepository.save(user);
    }
    throw new AppError('User-id not informed.');
  }
}

export default UpdateUserService;
