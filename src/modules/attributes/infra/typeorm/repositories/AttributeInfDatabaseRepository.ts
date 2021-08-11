import { getRepository, Repository } from 'typeorm';

import IAttributeInfDataBaseRepository from '@modules/attributes/repositories/IAttributeInfDatabaseRepository';
import AttributeInfDatabase from '@modules/attributes/infra/typeorm/entities/AttributeInfDatabase';

class AttributeInfDataBaseRepository
  implements IAttributeInfDataBaseRepository {
  private ormRepository: Repository<AttributeInfDatabase>;

  constructor() {
    this.ormRepository = getRepository(AttributeInfDatabase);
  }

  public async findById(
    id: string,
  ): Promise<AttributeInfDatabase[] | undefined> {
    const findAttributeInf = await this.ormRepository.find({
      where: { attribute_id: id },
      relations: ['type'],
    });

    return findAttributeInf;
  }
}

export default AttributeInfDataBaseRepository;
