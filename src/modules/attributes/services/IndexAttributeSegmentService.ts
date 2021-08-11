import { inject, injectable } from 'tsyringe';

import AttributeSegment from '../infra/typeorm/entities/AttributeSegment';

import IAttributesSegmentRepository from '../repositories/IAttributesSegmentRepository';

@injectable()
class IndexAttributeSegmentService {
  constructor(
    @inject('AttributesSegmentRepository')
    private attributesSegmentRepository: IAttributesSegmentRepository,
  ) {}

  public async execute(): Promise<AttributeSegment[] | undefined> {
    const segments = await this.attributesSegmentRepository.index();

    return segments;
  }
}
export default IndexAttributeSegmentService;
