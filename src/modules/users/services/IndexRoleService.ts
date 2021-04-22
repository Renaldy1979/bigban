import Role from '@modules/users/infra/typeorm/entities/Role';
import { inject, injectable } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import IRolesRepository from '../repositories/IRolesRepository';

@injectable()
class IndexRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute(): Promise<Role[]> {
    const roles = await this.rolesRepository.index();

    return roles;
  }
}

export default IndexRoleService;
