import { MongoRepository, getMongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notifications';

class NotificatiosRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notificaation = this.ormRepository.create({ content, recipient_id });

    await this.ormRepository.save(notificaation);

    return notificaation;
  }

  public async index(): Promise<Notification[]> {
    const status = await this.ormRepository.find();
    return status;
  }

  public async findByRecipientId(
    recipient_id: string,
  ): Promise<Notification[]> {
    const status = await this.ormRepository.find({
      where: { recipient_id },
    });
    return status;
  }
}

export default NotificatiosRepository;
