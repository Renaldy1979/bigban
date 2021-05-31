import { getRepository, Repository } from 'typeorm';

import ICommentTypeRepository from '@modules/projects/repositories/ICommentTypeRepository';
import ICreateCommentTypeDTO from '@modules/projects/dtos/ICreateCommentTypeDTO';

import CommentType from '@modules/projects/infra/typeorm/entities/CommentType';

class CommentTypeRepository implements ICommentTypeRepository {
  private ormRepository: Repository<CommentType>;

  constructor() {
    this.ormRepository = getRepository(CommentType);
  }

  public async create({
    color,
    description,
    component,
  }: ICreateCommentTypeDTO): Promise<CommentType> {
    const commentType = this.ormRepository.create({
      color,
      description,
      component,
    });

    await this.ormRepository.save(commentType);

    return commentType;
  }

  public async index(): Promise<CommentType[]> {
    const commentType = await this.ormRepository.find();
    return commentType;
  }
}

export default CommentTypeRepository;
