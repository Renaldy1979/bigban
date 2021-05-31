import { getRepository, Repository } from 'typeorm';

import IStatusRepository from '@modules/projects/repositories/IStatusRepository';
import ICreateStatusDTO from '@modules/projects/dtos/ICreateStatusDTO';

import Status from '@modules/projects/infra/typeorm/entities/Status';

class StatusRepository implements IStatusRepository {
  private ormRepository: Repository<Status>;

  constructor() {
    this.ormRepository = getRepository(Status);
  }

  public async create({
    color,
    description,
  }: ICreateStatusDTO): Promise<Status> {
    const status = this.ormRepository.create({ color, description });

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
}

export default StatusRepository;
