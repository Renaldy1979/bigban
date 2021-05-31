import { v4 as uuidv4 } from 'uuid';
import ICreateStatusDTO from '@modules/projects/dtos/ICreateStatusDTO';
import IStatusRepository from '@modules/projects/repositories/IStatusRepository';
import Status from '@modules/projects/infra/typeorm/entities/Status';

class StatusRepository implements IStatusRepository {
  private status: Status[] = [];

  public async create({
    description,
    color,
    order,
  }: ICreateStatusDTO): Promise<Status> {
    const status = new Status();

    Object.assign(status, {
      id: uuidv4(),
      description,
      color,
      order,
    });

    this.status.push(status);

    return status;
  }

  public async index(): Promise<Status[]> {
    const { status } = this;

    return status;
  }

  public async findByDescription(
    description: string,
  ): Promise<Status | undefined> {
    const findProjectCode = this.status.find(
      status => status.description === description,
    );

    return findProjectCode;
  }
}

export default StatusRepository;
