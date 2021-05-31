import { getRepository, Repository } from 'typeorm';

import ICommentsRepository from '@modules/projects/repositories/ICommentsRepository';
import ICreateCommentDTO from '@modules/projects/dtos/ICreateCommentDTO';

import Comment from '@modules/projects/infra/typeorm/entities/Comment';

class CommentsRepository implements ICommentsRepository {
  private ormRepository: Repository<Comment>;

  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  public async create(commentData: ICreateCommentDTO): Promise<Comment> {
    const comment = this.ormRepository.create(commentData);

    await this.ormRepository.save(comment);

    return comment;
  }

  public async save(comment: Comment): Promise<Comment> {
    return this.ormRepository.save(comment);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async show(id: string): Promise<Comment | undefined> {
    const findComment = await this.ormRepository.findOne({
      where: { id },
      relations: ['creater', 'type'],
    });

    return findComment;
  }

  public async findByProjectId(
    project_id: string,
  ): Promise<Comment[] | undefined> {
    const findComments = await this.ormRepository.find({
      where: { project_id },
      relations: ['creater', 'type'],
    });

    return findComments;
  }
}

export default CommentsRepository;
