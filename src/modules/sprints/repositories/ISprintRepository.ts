import Sprint from '@modules/sprints/infra/typeorm/entities/Sprint';
import ICreateSprintDTO from '../dtos/ICreateSprintDTO';

export default interface ISprintRepository {
  index(): Promise<Sprint[] | undefined>;
  show(id: string): Promise<Sprint[] | undefined>;
  findById(id: string): Promise<Sprint | undefined>;
  create(data: ICreateSprintDTO): Promise<Sprint>;
}
