import AttributeOrigin from '@modules/attributes/infra/typeorm/entities/AttributeOrigin';

export default interface IAttributesOriginRepository {
  index(): Promise<AttributeOrigin[] | undefined>;
  findById(id: string): Promise<AttributeOrigin | undefined>;
}
