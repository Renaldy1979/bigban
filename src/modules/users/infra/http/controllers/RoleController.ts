import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateRoleService from '@modules/users/services/CreateRoleService';
import UpdateRolesService from '@modules/users/services/UpdateRoleService';
import IndexRoleService from '@modules/users/services/IndexRoleService';

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
    const listRoles = container.resolve(IndexRoleService);

    const roles = await listRoles.execute();

    return response.json(roles);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { role_id, name, description } = request.body;

    const updateRole = container.resolve(UpdateRolesService);

    const role = await updateRole.execute({
      role_id,
      name,
      description,
    });

    return response.json(role);
  }
}
