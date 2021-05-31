import IStatusRepository from '@modules/projects/repositories/IStatusRepository';
import Status from '@modules/projects/infra/typeorm/entities/Status';
import { inject, injectable } from 'tsyringe';

@injectable()
class IndexStatusService {
  constructor(
    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
  ) {}

  public async execute(): Promise<Status[]> {
    const status = await this.statusRepository.index();

    return status;
  }
}

export default IndexStatusService;
