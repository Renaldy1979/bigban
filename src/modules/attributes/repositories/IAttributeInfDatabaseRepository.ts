import AttributeInfDatabase from '@modules/attributes/infra/typeorm/entities/AttributeInfDatabase';

export default interface IAttributeInfDatabaseRepository {
  findById(id: string): Promise<AttributeInfDatabase[] | undefined>;
}
