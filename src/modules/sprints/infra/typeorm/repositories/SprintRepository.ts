import { getRepository, Repository } from 'typeorm';

import ISprintRepository from '@modules/sprints/repositories/ISprintRepository';
import Sprint from '@modules/sprints/infra/typeorm/entities/Sprint';
import ICreateSprintDTO from '@modules/sprints/dtos/ICreateSprintDTO';

class SprintRepository implements ISprintRepository {
  private ormRepository: Repository<Sprint>;

  constructor() {
    this.ormRepository = getRepository(Sprint);
  }

  public async findById(id: string): Promise<Sprint | undefined> {
    const sprints = await this.ormRepository.findOne({
      where: { id },
    });
    return sprints;
  }

  public async index(): Promise<Sprint[] | undefined> {
    const sprints = await this.ormRepository.find({
      relations: ['sprintsDates', 'sprintsDates.dates'],
    });
    return sprints;
  }

  public async show(id: string): Promise<Sprint[] | undefined> {
    const sprints = await this.ormRepository.find({
      where: { id },
      relations: ['sprintsDates', 'sprintsDates.dates', 'status'],
    });
    return sprints;
  }

  public async create(sprintData: ICreateSprintDTO): Promise<Sprint> {
    const sprint = this.ormRepository.create(sprintData);

    await this.ormRepository.save(sprint);

    return sprint;
  }
}

export default SprintRepository;
