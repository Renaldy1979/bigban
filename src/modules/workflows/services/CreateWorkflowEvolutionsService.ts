import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import WorkflowEvolution from '../infra/typeorm/entities/WorkflowEvolution';

import IWorkflowsEvolutionsRepository from '../repositories/IWorkflowsEvolutionsRepository';
import IWorkflowsRepository from '../repositories/IWorkflowsRepository';

interface IRequest {
  workflow_id: string;
  description: string;
  creater_id: string;
}
@injectable()
class CreateWorkflowEvolutionsService {
  constructor(
    @inject('WorkflowsEvolutionsRepository')
    private workflowsEvolutionsRepository: IWorkflowsEvolutionsRepository,

    @inject('WorkflowsRepository')
    private workflowsRepository: IWorkflowsRepository,
  ) {}

  public async execute({
    workflow_id,
    description,
    creater_id,
  }: IRequest): Promise<WorkflowEvolution> {
    const checkWorkflowExists = await this.workflowsRepository.findById(
      workflow_id,
    );

    if (!checkWorkflowExists) {
      throw new AppError('Workflow not found');
    }

    if (!description) {
      throw new AppError('Description not informed');
    }
    const workflowEvolution = await this.workflowsEvolutionsRepository.create({
      workflow_id,
      description,
      creater_id,
    });

    return workflowEvolution;
  }
}

export default CreateWorkflowEvolutionsService;
