import AttributeStatus from '@modules/attributes/infra/typeorm/entities/AttributeStatus';

export default interface IAttributesStatusRepository {
  // create(data: ICreateAttributeDTO): Promise<Attribute>;
  // save(attribute: Attribute): Promise<Attribute>;
  // delete(id: string): Promise<void>;
  index(): Promise<AttributeStatus[] | undefined>;
  findByAttributeStatusId(
    status_id: string,
  ): Promise<AttributeStatus | undefined>;
}
