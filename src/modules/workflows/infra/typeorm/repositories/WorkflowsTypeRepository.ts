import { getRepository, Repository } from 'typeorm';

import IWorkflowsTypeRepository from '@modules/workflows/repositories/IWorkflowsTypeRepository';
import WorkflowType from '@modules/workflows/infra/typeorm/entities/WorkflowType';
import ICreateWorkflowTypeDTO from '../../../dtos/ICreateWorkflowTypeDTO';

class WorkflowsTypeRepository implements IWorkflowsTypeRepository {
  private ormRepository: Repository<WorkflowType>;

  constructor() {
    this.ormRepository = getRepository(WorkflowType);
  }

  public async create({
    description,
  }: ICreateWorkflowTypeDTO): Promise<WorkflowType> {
    const workflowType = this.ormRepository.create({
      description,
    });

    await this.ormRepository.save(workflowType);

    return workflowType;
  }

  public async findById(id: string): Promise<WorkflowType | undefined> {
    const type = await this.ormRepository.findOne({ where: { id } });
    return type;
  }

  public async index(): Promise<WorkflowType[] | undefined> {
    const types = await this.ormRepository.find();
    return types;
  }
}

export default WorkflowsTypeRepository;
