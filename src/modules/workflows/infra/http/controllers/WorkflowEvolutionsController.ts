import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWorkflowEvolutionsService from '@modules/workflows/services/CreateWorkflowEvolutionsService';

import IndexWorkflowEvolutionsService from '@modules/workflows/services/IndexWorkflowEvolutionsService';
import ShowWorkflowEvolutionsService from '@modules/workflows/services/ShowWorkflowEvolutionsService';
import { classToClass } from 'class-transformer';

export default class WorkflowEvolutionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { workflow_id, description } = request.body;

    const userLogged = request.user.id;

    const createEvolution = container.resolve(CreateWorkflowEvolutionsService);

    const evolution = await createEvolution.execute({
      workflow_id,
      description,
      creater_id: userLogged,
    });

    return response.json(evolution);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexEvolutions = container.resolve(IndexWorkflowEvolutionsService);

    const evolution = await indexEvolutions.execute();

    return response.json(classToClass(evolution));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showEvolution = container.resolve(ShowWorkflowEvolutionsService);

    const evolution = await showEvolution.execute(id);

    return response.json(classToClass(evolution));
  }
}
