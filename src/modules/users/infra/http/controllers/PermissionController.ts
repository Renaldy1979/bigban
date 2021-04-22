import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePermissionService from '@modules/users/services/CreatePermissionService';

import IndexPermissionService from '@modules/users/services/IndexPermissionService';

import UpdatePermissionService from '@modules/users/services/UpdatePermissionService';

export default class PermissionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createUser = container.resolve(CreatePermissionService);

    const permission = await createUser.execute({
      name,
      description,
    });

    return response.json(permission);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listPermissionss = container.resolve(IndexPermissionService);

    const permissions = await listPermissionss.execute();

    return response.json(permissions);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { permission_id, name, description } = request.body;

    const updatePermission = container.resolve(UpdatePermissionService);

    const permission = await updatePermission.execute({
      permission_id,
      name,
      description,
    });

    return response.json(permission);
  }
}
