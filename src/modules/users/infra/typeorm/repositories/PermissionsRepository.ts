import { getRepository, Repository } from 'typeorm';

import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import ICreatePermissionDTO from '@modules/users/dtos/ICreatePermissionDTO';

import Permission from '../entities/Permission';

class PermissionsRepository implements IPermissionsRepository {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }

  public async create(
    permissionData: ICreatePermissionDTO,
  ): Promise<Permission> {
    const permission = this.ormRepository.create(permissionData);

    await this.ormRepository.save(permission);

    return permission;
  }

  public async findByName(name: string): Promise<Permission | undefined> {
    const permission = await this.ormRepository.findOne({ where: { name } });
    return permission;
  }

  public async findByIds(id: string[]): Promise<Permission[] | undefined> {
    const permissions = await this.ormRepository.findByIds(id);
    return permissions;
  }

  public async index(): Promise<Permission[]> {
    const permissions = await this.ormRepository.find();
    return permissions;
  }

  public async save(permission: Permission): Promise<Permission> {
    return this.ormRepository.save(permission);
  }

  public async findById(id: string): Promise<Permission | undefined> {
    const permissions = await this.ormRepository.findOne(id);
    return permissions;
  }
}

export default PermissionsRepository;
