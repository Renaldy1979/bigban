import { inject, injectable } from 'tsyringe';

import WorkflowStatus from '../infra/typeorm/entities/WorkflowStatus';

import IWorkflowsStatusRepository from '../repositories/IWorkflowsStatusRepository';

@injectable()
class IndexWorkflowStatusService {
  constructor(
    @inject('WorkflowsStatusRepository')
    private workflowsStatusRepository: IWorkflowsStatusRepository,
  ) {}

  public async execute(): Promise<WorkflowStatus[] | undefined> {
    const workflowStatus = await this.workflowsStatusRepository.index();

    return workflowStatus;
  }
}

export default IndexWorkflowStatusService;
