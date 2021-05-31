import Status from '@modules/projects/infra/typeorm/entities/Status';
import ICreateStatusDTO from '../dtos/ICreateStatusDTO';

export default interface IProjectsRepository {
  create(data: ICreateStatusDTO): Promise<Status>;
  index(): Promise<Status[]>;
  findByDescription(description: string): Promise<Status | undefined>;
}
