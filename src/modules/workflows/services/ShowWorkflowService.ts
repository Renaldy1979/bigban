import IWorkflowsRepository from '@modules/workflows/repositories/IWorkflowsRepository';
import Workflow from '@modules/workflows/infra/typeorm/entities/Workflow';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowWorkflowService {
  constructor(
    @inject('WorkflowsRepository')
    private workflowsRepository: IWorkflowsRepository,
  ) {}

  public async execute(id: string): Promise<Workflow | undefined> {
    const workflow = await this.workflowsRepository.show(id);

    if (!workflow) {
      throw new AppError('Workflow not found.');
    }
    return workflow;
  }
}

export default ShowWorkflowService;
