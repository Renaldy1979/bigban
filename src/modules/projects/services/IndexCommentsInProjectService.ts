import AppError from '@shared/errors/AppError';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICommentsRepository from '@modules/projects/repositories/ICommentsRepository';
import Comment from '@modules/projects/infra/typeorm/entities/Comment';
import { inject, injectable } from 'tsyringe';

@injectable()
class IndexCommentsInProjectService {
  constructor(
    @inject('CommentsRepository')
    private commentRepository: ICommentsRepository,

    @inject('ProjectsRepository')
    private projectRepository: IProjectsRepository,
  ) {}

  public async execute(project_id: string): Promise<Comment[]> {
    if (!project_id) {
      throw new AppError('Project ID is null');
    }

    const checkProjectExists = await this.projectRepository.findById(
      project_id,
    );

    if (!checkProjectExists) {
      throw new AppError('Projet dos not exists');
    }

    const comments = await this.commentRepository.findByProjectId(project_id);

    if (!comments) {
      throw new AppError('Comments not found.');
    }

    return comments;
  }
}

export default IndexCommentsInProjectService;
