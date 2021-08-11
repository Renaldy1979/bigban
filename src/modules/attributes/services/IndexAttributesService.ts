import { inject, injectable } from 'tsyringe';
import Attribute from '../infra/typeorm/entities/Attribute';
import IAttributesRepository from '../repositories/IAttributesRepository';

@injectable()
class IndexAttributesService {
  constructor(
    @inject('AttributesRepository')
    private attributesRepository: IAttributesRepository,
  ) {}

  public async execute(): Promise<Attribute[]> {
    const attributes = await this.attributesRepository.index();

    return attributes;
  }
}

export default IndexAttributesService;
