import { inject, injectable } from 'tsyringe';
import CommentType from '../infra/typeorm/entities/CommentType';
import ICommentTypeRepository from '../repositories/ICommentTypeRepository';

@injectable()
class IndexCommentTypeService {
  constructor(
    @inject('CommentTypeRepository')
    private commentTypeRepository: ICommentTypeRepository,
  ) {}

  public async execute(): Promise<CommentType[]> {
    const commentType = await this.commentTypeRepository.index();

    return commentType;
  }
}

export default IndexCommentTypeService;
