import ICreateUsersTokensDTO from '../dtos/ICreateUsersTokensDTO';
import UsersTokens from '../infra/typeorm/entities/UsersTokens';

export default interface IUsertokensRepository {
  generate({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUsersTokensDTO): Promise<UsersTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UsersTokens | undefined>;

  deleteById(id: string): Promise<void>;
}
