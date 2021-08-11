import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import WorkflowEvolution from '../infra/typeorm/entities/WorkflowEvolution';

import IWorkflowsEvolutionsRepository from '../repositories/IWorkflowsEvolutionsRepository';

@injectable()
class ShowWorkflowEvolutionsService {
  constructor(
    @inject('WorkflowsEvolutionsRepository')
    private workflowsEvolutionsRepository: IWorkflowsEvolutionsRepository,
  ) {}

  public async execute(
    workflow_id: string,
  ): Promise<WorkflowEvolution[] | undefined> {
    const workflowEvolution = await this.workflowsEvolutionsRepository.findByWorkflowId(
      workflow_id,
    );

    if (!workflowEvolution) {
      throw new AppError('workflow not found');
    }

    return workflowEvolution;
  }
}

export default ShowWorkflowEvolutionsService;
