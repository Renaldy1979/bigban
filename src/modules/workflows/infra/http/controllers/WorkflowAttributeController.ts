import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWorkflowAttributeService from '@modules/workflows/services/CreateWorkflowAttributeService';
import IndexWorkflowAttributeService from '@modules/workflows/services/IndexWorkflowAttributeService';
import FindWorkflowsWithAttributesService from '@modules/workflows/services/FindWorkflowsWithAttributesService';
import { classToClass } from 'class-transformer';

export default class WorkflowAttributeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { workflow_id, attribute_id } = request.body;

    const createItem = container.resolve(CreateWorkflowAttributeService);

    const item = await createItem.execute({
      workflow_id,
      attribute_id,
    });

    return response.json(item);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexWorkflowItem = container.resolve(IndexWorkflowAttributeService);

    const itens = await indexWorkflowItem.execute();

    return response.json(classToClass(itens));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showWorkflows = container.resolve(FindWorkflowsWithAttributesService);

    const workflows = await showWorkflows.execute(id);

    return response.json(classToClass(workflows));
  }
}
