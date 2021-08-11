import IWorkflowsTypeRepository from '@modules/workflows/repositories/IWorkflowsTypeRepository';
import WorkflowType from '@modules/workflows/infra/typeorm/entities/WorkflowType';
import { inject, injectable } from 'tsyringe';

@injectable()
class IndexWorkflowsTypesService {
  constructor(
    @inject('WorkflowsTypeRepository')
    private workflowsTypeRepository: IWorkflowsTypeRepository,
  ) {}

  public async execute(): Promise<WorkflowType[] | undefined> {
    const workflowTypes = await this.workflowsTypeRepository.index();

    return workflowTypes;
  }
}

export default IndexWorkflowsTypesService;
