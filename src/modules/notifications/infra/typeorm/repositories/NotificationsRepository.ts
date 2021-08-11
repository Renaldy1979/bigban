import { MongoRepository, getMongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notifications';
import { ObjectID } from 'mongodb';

class NotificatiosRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
    read,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      recipient_id,
      read,
    });

    await this.ormRepository.save(notification);

    return notification;
  }

  public async index(): Promise<Notification[]> {
    const notification = await this.ormRepository.find();
    return notification;
  }

  public async findByRecipientId(
    recipient_id: string,
  ): Promise<Notification[]> {
    const notification = await this.ormRepository.find({
      where: { recipient_id },
    });
    return notification;
  }

  public async findById(id: string): Promise<Notification | undefined> {
    const notification = await this.ormRepository.findOne({
      where: { _id: new ObjectID(id) },
    });
    return notification;
  }

  public async UpdateAllByRecipientId(
    recipient_id: string,
  ): Promise<Notification | undefined> {
    const findNotification = await this.ormRepository.updateMany(
      { recipient_id, read: false },
      {
        $set: { read: true },
      },
      { upsert: false },
    );
    return (findNotification as unknown) as Notification;
  }

  public async findByIdAndUpdatedRead(
    id: string,
  ): Promise<Notification | undefined> {
    const filter = { _id: new ObjectID(id) };
    const update = { read: true };

    const notification = await this.ormRepository.findOneAndUpdate(
      filter,
      {
        $set: update,
      },
      { returnOriginal: false },
    );

    return notification as Notification;
  }
}

export default NotificatiosRepository;
