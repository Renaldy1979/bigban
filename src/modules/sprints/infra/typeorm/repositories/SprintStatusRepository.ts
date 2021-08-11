import { getRepository, Repository } from 'typeorm';

import ISprintStatusRepository from '@modules/sprints/repositories/ISprintStatusRepository';
import ICreateStatusDTO from '@modules/sprints/dtos/ICreateStatusDTO';

import Status from '@modules/sprints/infra/typeorm/entities/Status';

class SprintStatusRepository implements ISprintStatusRepository {
  private ormRepository: Repository<Status>;

  constructor() {
    this.ormRepository = getRepository(Status);
  }

  public async create({ description }: ICreateStatusDTO): Promise<Status> {
    const status = this.ormRepository.create({ description });
    await this.ormRepository.save(status);

    return status;
  }

  public async index(): Promise<Status[]> {
    const status = await this.ormRepository.find();
    return status;
  }

  public async findByDescription(
    description: string,
  ): Promise<Status | undefined> {
    const status = await this.ormRepository.findOne({ where: { description } });
    return status;
  }

  public async findById(id: string): Promise<Status | undefined> {
    const status = await this.ormRepository.findOne({ where: { id } });
    return status;
  }
}

export default SprintStatusRepository;
