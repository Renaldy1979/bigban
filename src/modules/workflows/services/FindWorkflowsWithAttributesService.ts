import IWorkflowsRepository from '@modules/workflows/repositories/IWorkflowsRepository';
import Workflow from '@modules/workflows/infra/typeorm/entities/Workflow';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

@injectable()
class FindWorkflowsWithAttributesService {
  constructor(
    @inject('WorkflowsRepository')
    private workflowsRepository: IWorkflowsRepository,
  ) {}

  public async execute(attribute_id: string): Promise<Workflow[]> {
    const workflows = await this.workflowsRepository.findByAttibuteId(
      attribute_id,
    );

    if (!workflows) {
      throw new AppError('No exists requests for this attribute-id');
    }

    return workflows;
  }
}

export default FindWorkflowsWithAttributesService;
