import Comment from '@modules/projects/infra/typeorm/entities/Comment';
import ICreateCommenttDTO from '../dtos/ICreateCommentDTO';

export default interface IProjectsRepository {
  create(data: ICreateCommenttDTO): Promise<Comment>;
  save(comment: Comment): Promise<Comment>;
  delete(id: string): Promise<void>;
  show(id: string): Promise<Comment | undefined>;
  findByProjectId(project_id: string): Promise<Comment[] | undefined>;
}
