import { inject, injectable } from 'tsyringe';

import Sprint from '../infra/typeorm/entities/Sprint';

import ISprintRepository from '../repositories/ISprintRepository';

@injectable()
class IndexSprintsService {
  constructor(
    @inject('SprintRepository')
    private sprintRepository: ISprintRepository,
  ) {}

  public async execute(): Promise<Sprint[] | undefined> {
    const sprint = await this.sprintRepository.index();

    return sprint;
  }
}

export default IndexSprintsService;
