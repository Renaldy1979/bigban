import { inject, injectable } from 'tsyringe';
import Role from '@modules/users/infra/typeorm/entities/Role';
import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  permissions: string[];
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    name,
    description,
    permissions,
  }: IRequest): Promise<Role> {
    const existRoleName = await this.rolesRepository.findByName(name);

    if (existRoleName) {
      throw new AppError('A rule with this name already exists');
    }

    const existRoleDescription = await this.rolesRepository.findByDescription(
      description,
    );

    if (existRoleDescription) {
      throw new AppError('A rule with this description already exists');
    }

    const existPermissions = await this.permissionsRepository.findByIds(
      permissions,
    );

    const role = await this.rolesRepository.create({
      name,
      description,
      permissions: existPermissions,
    });

    return role;
  }
}
export default CreateRoleService;
