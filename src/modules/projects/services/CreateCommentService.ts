import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import INofiticationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Comment from '../infra/typeorm/entities/Comment';
import ICommentsRepository from '../repositories/ICommentsRepository';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  description: string;
  project_id: string;
  creater_id: string;
  type_id: string;
}
@injectable()
class CreateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INofiticationsRepository,
  ) {}

  public async execute({
    description,
    project_id,
    creater_id,
    type_id,
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
    let infoProject = '';

    if (checkExistsProject.code) {
      infoProject = `${checkExistsProject.code} - ${checkExistsProject.name}`;
    } else {
      infoProject = `${checkExistsProject.name}`;
    }

    const commentCreate = await this.commentsRepository.create({
      description,
      project_id,
      creater_id,
      type_id,
    });

    await this.notificationsRepository.create({
      recipient_id: checkExistsProject.requester_id,
      content: `Um novo comentário foi adicionado ao projeto ${infoProject}`,
      read: false,
    });

    return commentCreate;
  }
}

export default CreateCommentService;
