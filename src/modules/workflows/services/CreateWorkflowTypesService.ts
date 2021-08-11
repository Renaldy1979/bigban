import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import WorkflowType from '../infra/typeorm/entities/WorkflowType';

import IWorkflowsTypeRepository from '../repositories/IWorkflowsTypeRepository';

interface IRequest {
  description: string;
}
@injectable()
class CreateWorkflowService {
  constructor(
    @inject('WorkflowsTypeRepository')
    private workflowsTypeRepository: IWorkflowsTypeRepository,
  ) {}

  public async execute({ description }: IRequest): Promise<WorkflowType> {
    if (!description) {
      throw new AppError('Description not informed');
    }
    const workflow = await this.workflowsTypeRepository.create({
      description,
    });

    return workflow;
  }
}

export default CreateWorkflowService;
