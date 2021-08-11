import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWorkflowStatusService from '@modules/workflows/services/CreateWorkflowStatusService';
import IndexWorkflowStatusService from '@modules/workflows/services/IndexWorkflowStatusService';

export default class WorkflowStatusController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description, is_error } = request.body;

    const createWorkflowStatus = container.resolve(CreateWorkflowStatusService);

    const workflowStatus = await createWorkflowStatus.execute({
      description,
      is_error,
    });

    return response.json(workflowStatus);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexWorkflowStatus = container.resolve(IndexWorkflowStatusService);

    const workflowStatus = await indexWorkflowStatus.execute();

    return response.json(workflowStatus);
  }
}
