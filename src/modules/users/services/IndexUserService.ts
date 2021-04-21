import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class IndexUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.index();

    return users;
  }
}

export default IndexUserService;
