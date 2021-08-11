import IWorkflowsRepository from '@modules/workflows/repositories/IWorkflowsRepository';
import Workflow from '@modules/workflows/infra/typeorm/entities/Workflow';
import { inject, injectable } from 'tsyringe';

@injectable()
class IndexWorkflowsService {
  constructor(
    @inject('WorkflowsRepository')
    private workflowsRepository: IWorkflowsRepository,
  ) {}

  public async execute(): Promise<Workflow[]> {
    const workflow = await this.workflowsRepository.index();

    return workflow;
  }
}

export default IndexWorkflowsService;
