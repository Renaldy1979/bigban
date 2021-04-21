import { v4 as uuidv4 } from 'uuid';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import ICreatePermissionDTO from '@modules/users/dtos/ICreatePermissionDTO';

import Permission from '@modules/users/infra/typeorm/entities/Permission';

class PermissionsRepository implements IPermissionsRepository {
  private permissions: Permission[] = [];

  public async create(
    permissionData: ICreatePermissionDTO,
  ): Promise<Permission> {
    const permission = new Permission();

    Object.assign(permission, { id: uuidv4() }, permissionData);

    this.permissions.push(permission);
    return permission;
  }

  public async findByName(name: string): Promise<Permission | undefined> {
    const findPermission = this.permissions.find(
      permission => permission.name === name,
    );
    return findPermission;
  }

  public async findByIds(id: string[]): Promise<Permission[] | undefined> {
    const findPermissions = this.permissions.filter(permission =>
      id.includes(permission.id),
    );

    return findPermissions;
  }
}

export default PermissionsRepository;
