import { getRepository, Repository } from 'typeorm';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

import ICreateUsersTokensDTO from '@modules/users/dtos/ICreateUsersTokensDTO';
import UsersTokens from '@modules/users/infra/typeorm/entities/UsersTokens';

class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UsersTokens>;

  constructor() {
    this.ormRepository = getRepository(UsersTokens);
  }

  async generate({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersTokensDTO): Promise<UsersTokens> {
    const userToken = this.ormRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UsersTokens | undefined> {
    const userToken = await this.ormRepository.findOne({
      user_id,
      refresh_token,
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default UsersTokensRepository;
