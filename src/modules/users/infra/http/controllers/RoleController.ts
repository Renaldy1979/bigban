import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateRoleService from '@modules/users/services/CreateRoleService';

export default class RoleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, permissions } = request.body;

    const createRole = container.resolve(CreateRoleService);

    const role = await createRole.execute({
      name,
      description,
      permissions,
    });

    return response.json(role);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const ListUsers = container.resolve(IndexUserService);

    const user = await ListUsers.execute();

    return response.json(user);
  }
}
