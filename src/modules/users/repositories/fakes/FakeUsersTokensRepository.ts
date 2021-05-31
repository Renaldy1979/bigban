// import { v4 as uuidv4 } from 'uuid';
import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';

import UsersTokens from '@modules/users/infra/typeorm/entities/UsersTokens';
import ICreateUsersTokensDTO from '@modules/users/dtos/ICreateUsersTokensDTO';

class UsersTokensRepository implements IUsersTokensRepository {
  private usersTokens: UsersTokens[] = [];

  async generate({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersTokensDTO): Promise<UsersTokens> {
    const userToken = new UsersTokens();

    Object.assign(userToken, { expires_date, refresh_token, user_id });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UsersTokens | undefined> {
    const findUserToken = this.usersTokens.find(
      user => user.user_id === user_id && user.refresh_token === refresh_token,
    );
    return findUserToken;
  }

  async deleteById(id: string): Promise<void> {
    const findIndex = this.usersTokens.findIndex(token => token.id === id);

    this.usersTokens.splice(findIndex, 1);
  }
}

export default UsersTokensRepository;
