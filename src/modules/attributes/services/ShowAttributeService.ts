import AppError from '@shared/errors/AppError';
import IAttributesRepository from '@modules/attributes/repositories/IAttributesRepository';
import Attribute from '@modules/attributes/infra/typeorm/entities/Attribute';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowAttributeService {
  constructor(
    @inject('AttributesRepository')
    private attributesRepository: IAttributesRepository,
  ) {}

  public async execute(id: string): Promise<Attribute> {
    if (!id) {
      throw new AppError('Attribute ID is null');
    }

    const attribute = await this.attributesRepository.show(id);

    if (!attribute) {
      throw new AppError('Atrribute not found');
    }

    return attribute;
  }
}

export default ShowAttributeService;
