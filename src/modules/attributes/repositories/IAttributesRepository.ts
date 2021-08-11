import Attribute from '@modules/attributes/infra/typeorm/entities/Attribute';
import ICreateAttributeDTO from '../dtos/ICreateAttributeDTO';

export default interface IAttributesRepository {
  create(data: ICreateAttributeDTO): Promise<Attribute>;
  save(attribute: Attribute): Promise<Attribute>;
  show(id: string): Promise<Attribute | undefined>;
  index(): Promise<Attribute[]>;
  findByAttributeId(attribute_id: string): Promise<Attribute | undefined>;
  findByIds(attribute_id: Attribute[]): Promise<Attribute[] | undefined>;
}
