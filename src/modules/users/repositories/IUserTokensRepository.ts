import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUsertokensRepository {
  generate(id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}
