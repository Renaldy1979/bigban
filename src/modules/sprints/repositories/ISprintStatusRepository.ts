import Status from '@modules/sprints/infra/typeorm/entities/Status';
import ICreateStatusDTO from '../dtos/ICreateStatusDTO';

export default interface ISprintStatusRepository {
  create(data: ICreateStatusDTO): Promise<Status>;
  index(): Promise<Status[]>;
  findByDescription(description: string): Promise<Status | undefined>;
  findById(id: string): Promise<Status | undefined>;
}
