import { v4 as uuidv4 } from 'uuid';
import ICreateCommentDTO from '@modules/projects/dtos/ICreateCommentDTO';
import ICommentsRepository from '@modules/projects/repositories/ICommentsRepository';
import Comment from '@modules/projects/infra/typeorm/entities/Comment';

class CommentsRepository implements ICommentsRepository {
  private comments: Comment[] = [];

  public async create({
    description,
    creater_id,
    project_id,
  }: ICreateCommentDTO): Promise<Comment> {
    const comment = new Comment();

    Object.assign(comment, {
      id: uuidv4(),
      description,
      creater_id,
      project_id,
    });

    this.comments.push(comment);

    return comment;
  }

  public async save(comment: Comment): Promise<Comment> {
    const findIndex = this.comments.findIndex(
      findComment => findComment.id === comment.id,
    );

    this.comments[findIndex] = comment;
    return comment;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.comments.findIndex(comment => comment.id === id);

    this.comments.splice(findIndex, 1);
  }

  public async show(id: string): Promise<Comment | undefined> {
    const findComment = this.comments.find(comment => comment.id === id);

    return findComment;
  }

  public async findByProjectId(
    project_id: string,
  ): Promise<Comment[] | undefined> {
    const findComments = this.comments.filter(comment =>
      project_id.includes(comment.project_id),
    );

    return findComments;
  }
}

export default CommentsRepository;
