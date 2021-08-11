import { inject, injectable } from 'tsyringe';

import WorkflowEvolution from '../infra/typeorm/entities/WorkflowEvolution';

import IWorkflowsEvolutionsRepository from '../repositories/IWorkflowsEvolutionsRepository';

@injectable()
class IndexWorkflowEvolutionsService {
  constructor(
    @inject('WorkflowsEvolutionsRepository')
    private workflowsEvolutionsRepository: IWorkflowsEvolutionsRepository,
  ) {}

  public async execute(): Promise<WorkflowEvolution[] | undefined> {
    const workflowEvolution = await this.workflowsEvolutionsRepository.index();

    return workflowEvolution;
  }
}

export default IndexWorkflowEvolutionsService;
