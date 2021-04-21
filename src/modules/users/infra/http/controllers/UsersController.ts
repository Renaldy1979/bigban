import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import IndexUserService from '@modules/users/services/IndexUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, roles } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      roles,
    });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
      roles: user.roles,
    };

    return response.json(userWithoutPassword);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const ListUsers = container.resolve(IndexUserService);

    const user = await ListUsers.execute();

    return response.json(user);
  }

  public async save(request: Request, response: Response): Promise<Response> {
    const { user_id, name, email, password } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      user_id,
      name,
      email,
      password,
    });

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute(id);

    return response.json(user);
  }
}
