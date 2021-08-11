import { inject, injectable } from 'tsyringe';

import AttributeStatus from '../infra/typeorm/entities/AttributeStatus';

import IAttributesStatusRepository from '../repositories/IAttributesStatusRepository';

@injectable()
class IndexAttributeStatusService {
  constructor(
    @inject('AttributesStatusRepository')
    private attributesStatusRepository: IAttributesStatusRepository,
  ) {}

  public async execute(): Promise<AttributeStatus[] | undefined> {
    const status = await this.attributesStatusRepository.index();

    return status;
  }
}

export default IndexAttributeStatusService;
