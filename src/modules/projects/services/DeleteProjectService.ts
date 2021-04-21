import AppError from '@shared/errors/AppError';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
// import Project from '@modules/projects/infra/typeorm/entities/Project';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectRepository: IProjectsRepository,
  ) {}

  public async execute(project_id: string): Promise<void> {
    if (!project_id) {
      throw new AppError('Project ID is null');
    }

    await this.projectRepository.delete(project_id);
  }
}

export default DeleteProjectService;
