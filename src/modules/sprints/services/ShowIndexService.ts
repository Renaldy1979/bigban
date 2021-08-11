import { inject, injectable } from 'tsyringe';

import Sprint from '../infra/typeorm/entities/Sprint';

import ISprintRepository from '../repositories/ISprintRepository';

@injectable()
class ShowSprintsService {
  constructor(
    @inject('SprintRepository')
    private sprintRepository: ISprintRepository,
  ) {}

  public async execute(id: string): Promise<Sprint[] | undefined> {
    const sprint = await this.sprintRepository.show(id);

    return sprint;
  }
}

export default ShowSprintsService;
