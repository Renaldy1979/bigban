import Role from '@modules/users/infra/typeorm/entities/Role';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IRolesRepository from '../repositories/IRolesRepository';

interface IRequest {
  role_id: string;
  name: string;
  description: string;
}

@injectable()
class UpdateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({
    role_id,
    name,
    description,
  }: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findById(role_id);

    if (!role) {
      throw new AppError('Role not found.');
    }

    role.name = name;
    role.description = description;

    return this.rolesRepository.save(role);
  }
}

export default UpdateRoleService;
