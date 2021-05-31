import Role from '../infra/typeorm/entities/Role';
import ICreateRoleDTO from '../dtos/ICreateRoleDTO';
import IUpdateRoleDTO from '../dtos/IUpdateRoleDTO';

export default interface IUsersRepository {
  create(data: ICreateRoleDTO): Promise<Role>;
  index(): Promise<Role[]>;
  findByName(name: string): Promise<Role | undefined>;
  findByDescription(namedescription: string): Promise<Role | undefined>;
  findByIds(id: string[]): Promise<Role[] | undefined>;
  findById(id: string): Promise<Role | undefined>;
  save(data: IUpdateRoleDTO): Promise<Role>;
}
