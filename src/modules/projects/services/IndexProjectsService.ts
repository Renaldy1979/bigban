import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class IndexProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private projectRepository: IProjectsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Project[]> {
    const projects = await this.projectRepository.index();

    return projects;
  }
}

export default IndexProjectsService;
