import Permission from '../infra/typeorm/entities/Permission';
import ICreatePermissionDTO from '../dtos/ICreatePermissionDTO';

export default interface IUsersRepository {
  create(data: ICreatePermissionDTO): Promise<Permission>;
  findByName(name: string): Promise<Permission | undefined>;
  findByIds(id: string[]): Promise<Permission[] | undefined>;
}
