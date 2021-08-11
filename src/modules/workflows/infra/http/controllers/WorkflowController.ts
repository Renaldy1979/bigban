import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWorkflowService from '@modules/workflows/services/CreateWorkflowService';
import IndexWorkflowsService from '@modules/workflows/services/IndexWorkflowsService';
import ShowWorkflowService from '@modules/workflows/services/ShowWorkflowService';
import { classToClass } from 'class-transformer';

export default class WorkflowController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      description,
      date_opened,
      date_closed,
      status_id,
      type_id,
      requester_id,
      code_in,
      code_pb,
      code_bug,
      priority,
      attribute_id,
    } = request.body;

    const createStatus = container.resolve(CreateWorkflowService);

    const userLogged = request.user.id;

    const status = await createStatus.execute({
      description,
      date_opened,
      date_closed,
      status_id,
      type_id,
      requester_id,
      code_in,
      code_pb,
      code_bug,
      priority,
      attribute_id,
      creater_id: userLogged,
      updater_id: userLogged,
    });

    return response.json(status);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexWorkflow = container.resolve(IndexWorkflowsService);

    const workflow = await indexWorkflow.execute();

    return response.json(classToClass(workflow));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const indexWorkflow = container.resolve(ShowWorkflowService);

    const workflow = await indexWorkflow.execute(id);

    return response.json(classToClass(workflow));
  }
}
