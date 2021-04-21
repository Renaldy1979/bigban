// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Permission from '@modules/users/infra/typeorm/entities/Permission';
import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<Permission> {
    const existPermission = await this.permissionsRepository.findByName(name);

    if (existPermission) {
      throw new AppError('Permission already exists!');
    }

    const permission = await this.permissionsRepository.create({
      name,
      description,
    });

    return permission;
  }
}
export default CreatePermissionService;
