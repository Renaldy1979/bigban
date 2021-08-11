import AttributeSegment from '@modules/attributes/infra/typeorm/entities/AttributeSegment';

export default interface IAttributesSegmentRepository {
  index(): Promise<AttributeSegment[] | undefined>;
  findById(id: string): Promise<AttributeSegment | undefined>;
}
