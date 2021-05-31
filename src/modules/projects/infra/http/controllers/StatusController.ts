import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateStatusService from '@modules/projects/services/CreateStatusService';
import IndexStatusService from '@modules/projects/services/IndexStatusService';

export default class StatusController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description, color, order } = request.body;

    const createStatus = container.resolve(CreateStatusService);

    const project = await createStatus.execute({
      description,
      color,
      order,
    });

    return response.json(project);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexStatus = container.resolve(IndexStatusService);

    const status = await indexStatus.execute();

    return response.json(status);
  }
}
