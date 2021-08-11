import { inject, injectable } from 'tsyringe';

import AttributeOrigin from '../infra/typeorm/entities/AttributeOrigin';

import IAttributesOriginRepository from '../repositories/IAttributesOriginRepository';

@injectable()
class IndexAttributeOriginService {
  constructor(
    @inject('AttributesOriginRepository')
    private attributesOriginRepository: IAttributesOriginRepository,
  ) {}

  public async execute(): Promise<AttributeOrigin[] | undefined> {
    const origin = await this.attributesOriginRepository.index();

    return origin;
  }
}

export default IndexAttributeOriginService;
