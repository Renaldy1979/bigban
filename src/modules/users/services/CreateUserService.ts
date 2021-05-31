import Role from '@modules/users/infra/typeorm/entities/Role';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
  roles?: string[];
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    roles,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    let existsRoles: Role[] | undefined;

    if (checkUserExists) {
      throw new AppError('Email adrress already used');
    }

    const hashedPasword = await this.hashProvider.generateHash(password);

    if (roles) {
      existsRoles = await this.rolesRepository.findByIds(roles);
    }
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPasword,
      roles: existsRoles,
    });

    return user;
  }
}
export default CreateUserService;
