import { getRepository, Repository } from 'typeorm';

import IAttributesSegmentRepository from '@modules/attributes/repositories/IAttributesSegmentRepository';
import AttributeSegment from '@modules/attributes/infra/typeorm/entities/AttributeSegment';

class AttributesSegmentRepository implements IAttributesSegmentRepository {
  private ormRepository: Repository<AttributeSegment>;

  constructor() {
    this.ormRepository = getRepository(AttributeSegment);
  }

  public async findById(id: string): Promise<AttributeSegment | undefined> {
    const findSegment = await this.ormRepository.findOne({
      where: { id },
    });
    return findSegment;
  }

  public async index(): Promise<AttributeSegment[] | undefined> {
    const findSegment = await this.ormRepository.find();
    return findSegment;
  }
}

export default AttributesSegmentRepository;
