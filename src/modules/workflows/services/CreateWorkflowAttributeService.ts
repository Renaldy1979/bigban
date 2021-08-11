import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAttributesRepository from '@modules/attributes/repositories/IAttributesRepository';
import WorkflowAttributes from '../infra/typeorm/entities/WorkflowAttributes';

import IWorkflowsAttributesRepository from '../repositories/IWorkflowsAttributesRepository';
import IWorkflowsRepository from '../repositories/IWorkflowsRepository';

interface IRequest {
  workflow_id: string;
  attribute_id: string;
}
@injectable()
class CreateWorkflowAttributesService {
  constructor(
    @inject('WorkflowsAttributesRepository')
    private workflowsAttributesRepository: IWorkflowsAttributesRepository,

    @inject('WorkflowsRepository')
    private workflowsRepository: IWorkflowsRepository,

    @inject('AttributesRepository')
    private attributesRepository: IAttributesRepository,
  ) {}

  public async execute({
    workflow_id,
    attribute_id,
  }: IRequest): Promise<WorkflowAttributes> {
    const checkWorkflowExistes = await this.workflowsRepository.findById(
      workflow_id,
    );

    if (!checkWorkflowExistes) {
      throw new AppError('Workflow not exists');
    }

    const checkAttributeExists = await this.attributesRepository.findByAttributeId(
      attribute_id,
    );

    if (!checkAttributeExists) {
      throw new AppError('Attribute not exists');
    }
    const workflowAttributes = await this.workflowsAttributesRepository.create({
      workflow_id,
      attribute_id,
    });

    return workflowAttributes;
  }
}

export default CreateWorkflowAttributesService;
