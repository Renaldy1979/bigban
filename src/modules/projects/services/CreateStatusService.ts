// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Status from '../infra/typeorm/entities/Status';
import IStatusRepository from '../repositories/IStatusRepository';

interface IRequest {
  description: string;
  color: string;
  order: number;
}

@injectable()
class CreateCommentService {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
  ) {}

  public async execute({
    description,
    color,
    order,
  }: IRequest): Promise<Status> {
    const findStatusExists = await this.statusRepository.findByDescription(
      description,
    );

    if (findStatusExists) {
      throw new AppError('This status already existis');
    }

    const status = await this.statusRepository.create({
      description,
      color,
      order,
    });

    return status;
  }
}

export default CreateCommentService;
