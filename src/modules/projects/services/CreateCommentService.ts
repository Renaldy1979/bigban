import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Comment from '../infra/typeorm/entities/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  description: string;
  project_id: string;
  creater_id: string;
}
@injectable()
class CreateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
    description,
    project_id,
    creater_id,
  }: IRequest): Promise<Comment> {
    if (!creater_id) {
      throw new AppError('User creator not informed.');
    }

    if (!project_id) {
      throw new AppError('Project-ID not informed.');
    }

    if (!description) {
      throw new AppError('Description not informed.');
    }

    const checkExistsProject = await this.projectsRepository.findById(
      project_id,
    );

    if (!checkExistsProject) {
      throw new AppError('Project not found');
    }

    const commentCreate = await this.commentsRepository.create({
      description,
      project_id,
      creater_id,
    });

    return commentCreate;
  }
}

export default CreateCommentService;
