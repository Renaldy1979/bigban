import { getRepository, Repository } from 'typeorm';

import IWorkflowsStatusRepository from '@modules/workflows/repositories/IWorkflowsStatusRepository';
import ICreateWorkflowStatusDTO from '@modules/workflows/dtos/ICreateWorkflowStatusDTO';
import WorkflowStatus from '@modules/workflows/infra/typeorm/entities/WorkflowStatus';

class WorkflowsStatusRepository implements IWorkflowsStatusRepository {
  private ormRepository: Repository<WorkflowStatus>;

  constructor() {
    this.ormRepository = getRepository(WorkflowStatus);
  }

  public async create({
    description,
    is_error,
  }: ICreateWorkflowStatusDTO): Promise<WorkflowStatus> {
    const workflowStatus = this.ormRepository.create({
      description,
      is_error,
    });

    await this.ormRepository.save(workflowStatus);

    return workflowStatus;
  }

  public async index(): Promise<WorkflowStatus[] | undefined> {
    const status = await this.ormRepository.find();
    return status;
  }

  public async findById(id: string): Promise<WorkflowStatus | undefined> {
    const status = await this.ormRepository.findOne({ where: { id } });
    return status;
  }
}

export default WorkflowsStatusRepository;
