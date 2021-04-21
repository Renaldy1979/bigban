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
    const existRole = await this.rolesRepository.findByName(name);

    if (existRole) {
      throw new AppError('Role already exists!');
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
