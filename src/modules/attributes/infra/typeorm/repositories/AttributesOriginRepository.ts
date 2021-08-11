import { getRepository, Repository } from 'typeorm';

import IAttributesOriginRepository from '@modules/attributes/repositories/IAttributesOriginRepository';
import AttributeOrigin from '@modules/attributes/infra/typeorm/entities/AttributeOrigin';

class AttributesOriginRepository implements IAttributesOriginRepository {
  private ormRepository: Repository<AttributeOrigin>;

  constructor() {
    this.ormRepository = getRepository(AttributeOrigin);
  }

  public async findById(id: string): Promise<AttributeOrigin | undefined> {
    const findOrigin = await this.ormRepository.findOne({
      where: { id },
    });
    return findOrigin;
  }

  public async index(): Promise<AttributeOrigin[] | undefined> {
    const findOrigin = await this.ormRepository.find();
    return findOrigin;
  }
}

export default AttributesOriginRepository;
