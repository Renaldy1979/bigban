import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import INofiticationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Attribute from '../infra/typeorm/entities/Attribute';
import IAttributesRepository from '../repositories/IAttributesRepository';
import IAttributesStatusRepository from '../repositories/IAttributesStatusRepository';

interface IRequest {
  segment_id: string;
  origin_id: string;
  requester_id: string;
  attribute_name: string;
  status_id: string;
}
@injectable()
class CreateAttributeService {
  constructor(
    @inject('AttributesRepository')
    private attributesRepository: IAttributesRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INofiticationsRepository,

    @inject('AttributesStatusRepository')
    private attributesStatusRepository: IAttributesStatusRepository,
  ) {}

  public async execute({
    segment_id,
    origin_id,
    requester_id,
    attribute_name,
    status_id,
  }: IRequest): Promise<Attribute> {
    if (!requester_id) {
      throw new AppError('User requester not informed.');
    }

    if (!attribute_name) {
      throw new AppError('Attribute name not informed.');
    }

    if (!origin_id) {
      throw new AppError('Origin not informed.');
    }

    if (!segment_id) {
      throw new AppError('Segment not informed.');
    }

    const chekcStatusExists = await this.attributesStatusRepository.findByAttributeStatusId(
      status_id,
    );

    if (!chekcStatusExists) {
      throw new AppError('Status not found.');
    }

    const attributeCreate = await this.attributesRepository.create({
      segment_id,
      origin_id,
      requester_id,
      attribute_name,
      status_id,
    });

    await this.notificationsRepository.create({
      recipient_id: requester_id,
      content: `O atributo ${attribute_name} foi adicionado a lista tendo você como solicitante`,
      read: false,
    });

    return attributeCreate;
  }
}

export default CreateAttributeService;
