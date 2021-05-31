import AppError from '@shared/errors/AppError';
import ICommentsRepository from '@modules/projects/repositories/ICommentsRepository';
import Comment from '@modules/projects/infra/typeorm/entities/Comment';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowCommentsService {
  constructor(
    @inject('CommentsRepository')
    private commentRepository: ICommentsRepository,
  ) {}

  public async execute(id: string): Promise<Comment> {
    if (!id) {
      throw new AppError('Comment ID is null');
    }

    const comments = await this.commentRepository.show(id);

    if (!comments) {
      throw new AppError('Comments not found');
    }

    return comments;
  }
}

export default ShowCommentsService;
