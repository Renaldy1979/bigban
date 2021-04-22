import Permission from '@modules/users/infra/typeorm/entities/Permission';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IPermissionsRepository from '../repositories/IPermissionsRepository';

interface IRequest {
  permission_id: string;
  name: string;
  description: string;
}

@injectable()
class UpdatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({
    permission_id,
    name,
    description,
  }: IRequest): Promise<Permission> {
    const permission = await this.permissionsRepository.findById(permission_id);

    if (!permission) {
      throw new AppError('Permission not found.');
    }

    permission.name = name;
    permission.description = description;

    return this.permissionsRepository.save(permission);
  }
}

export default UpdatePermissionService;
