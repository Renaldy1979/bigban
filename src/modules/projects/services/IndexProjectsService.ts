import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import { inject, injectable } from 'tsyringe';

@injectable()
class IndexProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private projectRepository: IProjectsRepository,
  ) {}

  public async execute(): Promise<Project[]> {
    const projects = await this.projectRepository.index();

    return projects;
  }
}

export default IndexProjectsService;
