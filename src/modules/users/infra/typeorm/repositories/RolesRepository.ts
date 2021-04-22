import { getRepository, Repository } from 'typeorm';

import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';

import Role from '../entities/Role';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async create(roleData: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create(roleData);

    await this.ormRepository.save(role);

    return role;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({ where: { name } });
    return role;
  }

  public async findByIds(id: string[]): Promise<Role[] | undefined> {
    const roles = await this.ormRepository.findByIds(id);
    return roles;
  }

  public async findById(id: string): Promise<Role | undefined> {
    const roles = await this.ormRepository.findOne(id);
    return roles;
  }

  public async index(): Promise<Role[]> {
    const roles = await this.ormRepository.find({ relations: ['permissions'] });
    return roles;
  }

  public async save(user: Role): Promise<Role> {
    return this.ormRepository.save(user);
  }
}

export default RolesRepository;
