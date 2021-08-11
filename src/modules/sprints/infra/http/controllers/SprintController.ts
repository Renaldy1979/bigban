import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexSprintsService from '@modules/sprints/services/IndexSprintsService';
import CreateSprintService from '@modules/sprints/services/CreateSprintService';
import ShowIndexService from '@modules/sprints/services/ShowIndexService';

export default class SprintController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexSprints = container.resolve(IndexSprintsService);

    const sprints = await indexSprints.execute();

    return response.json(sprints);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showSprints = container.resolve(ShowIndexService);

    const sprints = await showSprints.execute(id);

    return response.json(sprints);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description, status_id } = request.body;
    const createSprint = container.resolve(CreateSprintService);

    const sprints = await createSprint.execute({ description, status_id });

    return response.json(sprints);
  }
}
