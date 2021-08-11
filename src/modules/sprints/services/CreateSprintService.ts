// import AppError from '@shared/errors/AppError';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Sprint from '../infra/typeorm/entities/Sprint';
import ISprintRepository from '../repositories/ISprintRepository';
import ISprintStatusRepository from '../repositories/ISprintStatusRepository';

interface IRequest {
  description: string;
  status_id: string;
}

@injectable()
class CreateSprintService {
  constructor(
    @inject('SprintRepository')
    private sprintRepository: ISprintRepository,

    @inject('SprintStatusRepository')
    private sprintStatusRepository: ISprintStatusRepository,
  ) {}

  public async execute({ description, status_id }: IRequest): Promise<Sprint> {
    const checkStatusExists = await this.sprintStatusRepository.findById(
      status_id,
    );

    if (!checkStatusExists) {
      throw new AppError('Status not found');
    }

    const sprint = await this.sprintRepository.create({
      description,
      status_id,
    });

    return sprint;
  }
}

export default CreateSprintService;
