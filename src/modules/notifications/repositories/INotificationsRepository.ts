import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../infra/typeorm/schemas/Notifications';

export default interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>;
  index(): Promise<Notification[]>;
  findByRecipientId(recipient_id: string): Promise<Notification[] | undefined>;
  findByIdAndUpdatedRead(id: string): Promise<Notification | undefined>;
  UpdateAllByRecipientId(
    recipient_id: string,
  ): Promise<Notification | undefined>;
  findById(id: string): Promise<Notification | undefined>;
}
