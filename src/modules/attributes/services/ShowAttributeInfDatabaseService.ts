import AppError from '@shared/errors/AppError';
import IAttributeInfDatabaseRepository from '@modules/attributes/repositories/IAttributeInfDatabaseRepository';
import AttributeInfDatabase from '@modules/attributes/infra/typeorm/entities/AttributeInfDatabase';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowAttributeInfDatabaseService {
  constructor(
    @inject('AttributeInfDatabaseRepository')
    private attributeInfDatabaseRepository: IAttributeInfDatabaseRepository,
  ) {}

  public async execute(id: string): Promise<AttributeInfDatabase[]> {
    if (!id) {
      throw new AppError('Attribute ID is null');
    }

    const attributeInf = await this.attributeInfDatabaseRepository.findById(id);

    if (!attributeInf) {
      throw new AppError('Atrribute not found');
    }

    return attributeInf;
  }
}

export default ShowAttributeInfDatabaseService;
