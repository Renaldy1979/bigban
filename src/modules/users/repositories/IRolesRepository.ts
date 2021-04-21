import Role from '../infra/typeorm/entities/Role';
import ICreateRoleDTO from '../dtos/ICreateRoleDTO';

export default interface IUsersRepository {
  create(data: ICreateRoleDTO): Promise<Role>;
  findByName(name: string): Promise<Role | undefined>;
  findByIds(id: string[]): Promise<Role[] | undefined>;
}
