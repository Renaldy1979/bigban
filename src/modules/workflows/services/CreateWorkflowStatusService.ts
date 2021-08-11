import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import WorkflowStatus from '../infra/typeorm/entities/WorkflowStatus';

import IWorkflowsStatusRepository from '../repositories/IWorkflowsStatusRepository';

interface IRequest {
  description: string;
  is_error: string;
}
@injectable()
class CreateWorkflowStatusService {
  constructor(
    @inject('WorkflowsStatusRepository')
    private workflowsStatusRepository: IWorkflowsStatusRepository,
  ) {}

  public async execute({
    description,
    is_error,
  }: IRequest): Promise<WorkflowStatus> {
    if (!description) {
      throw new AppError('Description not informed');
    }
    const isErrorLowerCase = is_error.toLowerCase();

    const workflowStatus = await this.workflowsStatusRepository.create({
      description,
      is_error: isErrorLowerCase,
    });

    return workflowStatus;
  }
}

export default CreateWorkflowStatusService;
