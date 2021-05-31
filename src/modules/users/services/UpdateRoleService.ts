import Role from '@modules/users/infra/typeorm/entities/Role';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IRolesRepository from '../repositories/IRolesRepository';
import IPermissionsRepository from '../repositories/IPermissionsRepository';

interface IRequest {
  role_id: string;
  name: string;
  description: string;
  permissions?: string[];
}

@injectable()
class UpdateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    role_id,
    name,
    description,
    permissions,
  }: IRequest): Promise<Role> {
    if (role_id) {
      const role = await this.rolesRepository.findById(role_id);

      if (!role) {
        throw new AppError('Role not found.');
      }

      if (name) {
        role.name = name;
      }

      if (description) {
        role.description = description;
      }

      if (permissions) {
        const existsPermissions = await this.permissionsRepository.findByIds(
          permissions,
        );
        if (!existsPermissions?.length) {
          throw new AppError('Permissions not found.');
        }
        role.permissions = existsPermissions;
      }

      return this.rolesRepository.save(role);
    }
    throw new AppError('Role-ID not informed');
  }
}

export default UpdateRoleService;
