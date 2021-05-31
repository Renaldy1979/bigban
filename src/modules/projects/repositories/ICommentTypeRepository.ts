import CommentType from '@modules/projects/infra/typeorm/entities/CommentType';
import ICreateCommentTypeDTO from '../dtos/ICreateCommentTypeDTO';

export default interface IProjectsRepository {
  create(data: ICreateCommentTypeDTO): Promise<CommentType>;
  index(): Promise<CommentType[]>;
}
