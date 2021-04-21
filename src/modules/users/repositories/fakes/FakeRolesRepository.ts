import { v4 as uuidv4 } from 'uuid';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';

import Role from '@modules/users/infra/typeorm/entities/Role';

class RolesRepository implements IRolesRepository {
  private roles: Role[] = [];

  public async create(rolenData: ICreateRoleDTO): Promise<Role> {
    const permission = new Role();

    Object.assign(permission, { id: uuidv4() }, rolenData);

    this.roles.push(permission);
    return permission;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const findPermission = this.roles.find(role => role.name === name);
    return findPermission;
  }

  public async findByIds(id: string[]): Promise<Role[] | undefined> {
    const findRoles = this.roles.filter(role => id.includes(role.id));

    return findRoles;
  }
}

export default RolesRepository;
