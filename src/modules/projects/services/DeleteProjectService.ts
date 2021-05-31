import AppError from '@shared/errors/AppError';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import { validate } from 'uuid';
import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class DeleteProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectRepository: IProjectsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(project_id: string): Promise<boolean> {
    if (!project_id) {
      throw new AppError('Project ID is null');
    }

    const checkProjectIdisUuid = validate(project_id);

    if (!checkProjectIdisUuid) {
      throw new AppError('Project ID is not validy');
    }

    const checkExistsProject = await this.projectRepository.findById(
      project_id,
    );

    if (!checkExistsProject) {
      throw new AppError('Project ID not found');
    }

    await this.projectRepository.delete(project_id);

    await this.cacheProvider.invalidatePrefix('projects-list');

    return true;
  }
}

export default DeleteProjectService;
