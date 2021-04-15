import Project from '@modules/projects/infra/typeorm/entities/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import IFindAllProjectsDTO from '../dtos/IFindAllProjectsDTO';

export default interface IProjectsRepository {
  create(date: ICreateProjectDTO): Promise<Project>;
  findByCode(code: string): Promise<Project | undefined>;
  findAllProjects(data?: IFindAllProjectsDTO): Promise<Project[]>;
}
