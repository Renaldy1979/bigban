import { getRepository, Repository } from 'typeorm';

import IAttributesRepository from '@modules/attributes/repositories/IAttributesRepository';
import ICreateAttributeDTO from '@modules/attributes/dtos/ICreateAttributeDTO';

import Attribute from '@modules/attributes/infra/typeorm/entities/Attribute';

class AttributeRepository implements IAttributesRepository {
  private ormRepository: Repository<Attribute>;

  constructor() {
    this.ormRepository = getRepository(Attribute);
  }

  public async create(attributeData: ICreateAttributeDTO): Promise<Attribute> {
    const attribute = this.ormRepository.create(attributeData);

    await this.ormRepository.save(attribute);

    return attribute;
  }

  public async save(attribute: Attribute): Promise<Attribute> {
    return this.ormRepository.save(attribute);
  }

  public async index(): Promise<Attribute[]> {
    const attributes = await this.ormRepository.find({
      relations: [
        'requester',
        'creater',
        'updater',
        'status',
        'origin',
        'segment',
        'workflows',
        'workflows.status',
      ],
    });
    return attributes;
  }

  public async findByAttributeId(
    attribute_id: string,
  ): Promise<Attribute | undefined> {
    const findAttribute = await this.ormRepository.findOne({
      where: { id: attribute_id },
    });

    return findAttribute;
  }

  public async findByIds(id: Attribute[]): Promise<Attribute[] | undefined> {
    const findAttribute = await this.ormRepository.findByIds(id);
    return findAttribute;
  }

  public async findAttributeWithError(
    attribute_id: string,
  ): Promise<Attribute | undefined> {
    const findAttribute = await this.ormRepository.findOne({
      where: { id: attribute_id },
    });

    return findAttribute;
  }

  public async show(id: string): Promise<Attribute | undefined> {
    const findAttribute = await this.ormRepository.findOne({
      where: { id },
      relations: [
        'sprints',
        'sprints.sprintsDates',
        'sprints.status',
        'sprints.sprintsDates.dates',
        'workflows',
        'workflows.status',
        'requester',
        'creater',
        'updater',
        'status',
        'origin',
        'segment',
      ],
    });

    return findAttribute;
  }
}

export default AttributeRepository;
