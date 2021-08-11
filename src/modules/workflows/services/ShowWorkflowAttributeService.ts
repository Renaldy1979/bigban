import IWorkflowsAttributesRepository from '@modules/workflows/repositories/IWorkflowsAttributesRepository';
import WorkflowAttributes from '@modules/workflows/infra/typeorm/entities/WorkflowAttributes';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowWorkflowItensService {
  constructor(
    @inject('WorkflowsAttributesRepository')
    private workflowsAttributesRepository: IWorkflowsAttributesRepository,
  ) {}

  public async execute(attribute_id: string): Promise<WorkflowAttributes[]> {
    const workflowAttributes = await this.workflowsAttributesRepository.findByAttributeId(
      attribute_id,
    );

    if (!workflowAttributes) {
      throw new AppError('No exists requests for this attribute-id');
    }

    return workflowAttributes;
  }
}

export default ShowWorkflowItensService;
