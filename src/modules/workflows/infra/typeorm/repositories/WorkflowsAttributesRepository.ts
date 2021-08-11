import { getRepository, Repository } from 'typeorm';

import IWorkflowsAttributesRepository from '@modules/workflows/repositories/IWorkflowsAttributesRepository';
import ICreateWorkflowsAttributesDTO from '@modules/workflows/dtos/ICreateWorkflowsAttributesDTO';

import WorkflowAttributes from '@modules/workflows/infra/typeorm/entities/WorkflowAttributes';

class WorkflowsAttributesRepository implements IWorkflowsAttributesRepository {
  private ormRepository: Repository<WorkflowAttributes>;

  constructor() {
    this.ormRepository = getRepository(WorkflowAttributes);
  }

  public async create({
    workflow_id,
    attribute_id,
  }: ICreateWorkflowsAttributesDTO): Promise<WorkflowAttributes> {
    const workflowItem = this.ormRepository.create({
      workflow_id,
      attribute_id,
    });

    await this.ormRepository.save(workflowItem);

    return workflowItem;
  }

  public async index(): Promise<WorkflowAttributes[]> {
    const itens = await this.ormRepository.find({
      relations: ['workflow', 'workflow.status'],
    });
    return itens;
  }

  public async findByAttributeId(
    attribute_id: string,
  ): Promise<WorkflowAttributes[] | undefined> {
    const itens = await this.ormRepository.find({
      where: { attribute_id },
      relations: [
        'workflow',
        'workflow.status',
        'workflow.type',
        'workflow.requester',
      ],
    });
    return itens;
  }
}

export default WorkflowsAttributesRepository;
