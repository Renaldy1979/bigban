import { getRepository, Repository } from 'typeorm';

import IWorkflowsRepository from '@modules/workflows/repositories/IWorkflowsRepository';
import ICreateWorkflowDTO from '@modules/workflows/dtos/ICreateWorkflowDTO';

import Workflow from '@modules/workflows/infra/typeorm/entities/Workflow';

class WorkflowsRepository implements IWorkflowsRepository {
  private ormRepository: Repository<Workflow>;

  constructor() {
    this.ormRepository = getRepository(Workflow);
  }

  public async create({
    description,
    date_opened,
    date_closed,
    status_id,
    code_in,
    code_pb,
    code_bug,
    priority,
    type_id,
    requester_id,
    creater_id,
    updater_id,
  }: ICreateWorkflowDTO): Promise<Workflow> {
    const workflow = this.ormRepository.create({
      description,
      date_opened,
      date_closed,
      status_id,
      code_in,
      code_pb,
      code_bug,
      priority,
      type_id,
      requester_id,
      creater_id,
      updater_id,
    });

    await this.ormRepository.save(workflow);

    return workflow;
  }

  public async findById(id: string): Promise<Workflow | undefined> {
    const workflow = await this.ormRepository.findOne({ where: { id } });
    return workflow;
  }

  public async findByAttibuteId(
    attribute_id: string,
  ): Promise<Workflow[] | undefined> {
    const t = await this.ormRepository
      .createQueryBuilder('workflow')
      .innerJoinAndSelect('workflow.attributes', 'attribute')
      .innerJoinAndSelect('workflow.status', 'status')
      .where('attribute.id = :id', { id: attribute_id })
      .getMany();
    return t;
  }

  public async index(): Promise<Workflow[]> {
    const workflow = await this.ormRepository.find({
      relations: [
        'type',
        'status',
        'requester',
        'creater',
        'updater',
        'attributes',
      ],
    });
    return workflow;
  }

  public async show(id: string): Promise<Workflow | undefined> {
    const workflow = await this.ormRepository.findOne({
      where: { id },
      relations: [
        'type',
        'status',
        'requester',
        'creater',
        'updater',
        'attributes',
      ],
    });
    return workflow;
  }
}

export default WorkflowsRepository;
