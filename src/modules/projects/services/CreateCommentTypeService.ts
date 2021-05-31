import { inject, injectable } from 'tsyringe';
import CommentType from '../infra/typeorm/entities/CommentType';
import ICommentTypeRepository from '../repositories/ICommentTypeRepository';

interface IRequest {
  description: string;
  component: string;
  color: string;
}
@injectable()
class CreateCommentTypeService {
  constructor(
    @inject('CommentTypeRepository')
    private commentTypeRepository: ICommentTypeRepository,
  ) {}

  public async execute({
    description,
    color,
    component,
  }: IRequest): Promise<CommentType> {
    const commentTypeCreate = await this.commentTypeRepository.create({
      description,
      color,
      component,
    });

    return commentTypeCreate;
  }
}

export default CreateCommentTypeService;
