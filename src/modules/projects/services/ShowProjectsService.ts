import AppError from '@shared/errors/AppError';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private projectRepository: IProjectsRepository,
  ) {}

  public async execute(project_id: string): Promise<Project> {
    if (!project_id) {
      throw new AppError('Project ID is null');
    }

    const project = await this.projectRepository.show(project_id);

    if (!project) {
      throw new AppError('Project not found.');
    }

    return project;
  }
}

export default ShowProjectsService;
