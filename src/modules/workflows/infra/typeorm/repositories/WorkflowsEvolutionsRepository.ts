import { getRepository, Repository } from 'typeorm';

import IWorkflowsEvolutionsRepository from '@modules/workflows/repositories/IWorkflowsEvolutionsRepository';
import WorkflowEvolution from '@modules/workflows/infra/typeorm/entities/WorkflowEvolution';
import ICreateWorkflowEvolutionsDTO from '../../../dtos/ICreateWorkflowEvolutionsDTO';

class WorkflowsEvolutionsRepository implements IWorkflowsEvolutionsRepository {
  private ormRepository: Repository<WorkflowEvolution>;

  constructor() {
    this.ormRepository = getRepository(WorkflowEvolution);
  }

  public async create({
    workflow_id,
    description,
    creater_id,
  }: ICreateWorkflowEvolutionsDTO): Promise<WorkflowEvolution> {
    const workflowEvolution = this.ormRepository.create({
      workflow_id,
      description,
      creater_id,
    });

    await this.ormRepository.save(workflowEvolution);

    return workflowEvolution;
  }

  public async findById(id: string): Promise<WorkflowEvolution | undefined> {
    const workflowEvolution = await this.ormRepository.findOne({
      where: { id },
    });
    return workflowEvolution;
  }

  public async findByWorkflowId(
    workflow_id: string,
  ): Promise<WorkflowEvolution[] | undefined> {
    const workflowEvolution = await this.ormRepository.find({
      where: { workflow_id },
      relations: ['creater'],
    });
    return workflowEvolution;
  }

  public async index(): Promise<WorkflowEvolution[] | undefined> {
    const workflowEvolution = await this.ormRepository.find();
    return workflowEvolution;
  }
}

export default WorkflowsEvolutionsRepository;
