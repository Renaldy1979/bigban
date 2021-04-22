import Permission from '@modules/users/infra/typeorm/entities/Permission';
import { inject, injectable } from 'tsyringe';
// import AppError from '@shared/errors/AppError';
import IPermissionsRepository from '../repositories/IPermissionsRepository';

@injectable()
class IndexPermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  public async execute(): Promise<Permission[]> {
    const permissions = await this.permissionsRepository.index();

    return permissions;
  }
}

export default IndexPermissionService;
