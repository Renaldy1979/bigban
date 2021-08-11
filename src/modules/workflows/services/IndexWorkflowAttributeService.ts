import IWorkflowsAttributesRepository from '@modules/workflows/repositories/IWorkflowsAttributesRepository';
import WorkflowAttributes from '@modules/workflows/infra/typeorm/entities/WorkflowAttributes';
import { inject, injectable } from 'tsyringe';

@injectable()
class IndexWorkflowsItensService {
  constructor(
    @inject('WorkflowsAttributesRepository')
    private workflowsAttributesRepository: IWorkflowsAttributesRepository,
  ) {}

  public async execute(): Promise<WorkflowAttributes[]> {
    const workflowAttributes = await this.workflowsAttributesRepository.index();

    return workflowAttributes;
  }
}

export default IndexWorkflowsItensService;
