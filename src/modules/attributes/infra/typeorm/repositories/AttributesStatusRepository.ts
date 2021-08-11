import { getRepository, Repository } from 'typeorm';

import IAttributesStatusRepository from '@modules/attributes/repositories/IAttributesStatusRepository';
import AttributeStatus from '@modules/attributes/infra/typeorm/entities/AttributeStatus';

class AttributesStatusRepository implements IAttributesStatusRepository {
  private ormRepository: Repository<AttributeStatus>;

  constructor() {
    this.ormRepository = getRepository(AttributeStatus);
  }

  public async findByAttributeStatusId(
    status_id: string,
  ): Promise<AttributeStatus | undefined> {
    const findStatus = await this.ormRepository.findOne({
      where: { id: status_id },
    });
    return findStatus;
  }

  public async index(): Promise<AttributeStatus[] | undefined> {
    const findStatus = await this.ormRepository.find();
    return findStatus;
  }
}

export default AttributesStatusRepository;
