import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWorkflowTypesService from '@modules/workflows/services/CreateWorkflowTypesService';
import IndexWorkflowsTypesService from '@modules/workflows/services/IndexWorkflowsTypesService';

export default class WorkflowTypeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;

    const createWorkflowType = container.resolve(CreateWorkflowTypesService);

    const workflowType = await createWorkflowType.execute({
      description,
    });

    return response.json(workflowType);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexWorkflowTypes = container.resolve(IndexWorkflowsTypesService);

    const workflowTypes = await indexWorkflowTypes.execute();

    return response.json(workflowTypes);
  }
}
