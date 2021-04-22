import Project from '@modules/projects/infra/typeorm/entities/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

export default interface IProjectsRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
  index(): Promise<Project[]>;
  delete(id: string): Promise<boolean>;
  show(id: string): Promise<Project | undefined>;

  findByCode(code: string): Promise<Project | undefined>;
  findById(id: string): Promise<Project | undefined>;
}
