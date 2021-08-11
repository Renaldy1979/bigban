import { ObjectID } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notifications';

class NotificatiosRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async findByIdAndUpdatedRead(
    id: string,
  ): Promise<Notification | undefined> {
    const findNotification = this.notifications.find(
      notification => notification.id.toString() === id,
    );

    if (findNotification) {
      findNotification.read = true;
    }
    return findNotification;
  }

  public async create({
    content,
    recipient_id,
    read,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectID(),
      content,
      recipient_id,
      read,
    });

    this.notifications.push(notification);

    return notification;
  }

  public async index(): Promise<Notification[]> {
    const { notifications } = this;
    return notifications;
  }

  public async findByRecipientId(
    recipient_id: string,
  ): Promise<Notification[] | undefined> {
    const findNotification = this.notifications.filter(
      notification => notification.recipient_id === recipient_id,
    );

    return findNotification;
  }
}

export default NotificatiosRepository;
