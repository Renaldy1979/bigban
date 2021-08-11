// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notifications';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  content: string;
  recipient_id: string;
  read: boolean;
}

@injectable()
class CreateNotificationService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    content,
    recipient_id,
    read,
  }: IRequest): Promise<Notification> {
    const existsRecipientId = await this.usersRepository.findById(recipient_id);

    if (!existsRecipientId) {
      throw new AppError('Recipient-ID does not exists');
    }

    const notification = await this.notificationsRepository.create({
      recipient_id,
      content,
      read,
    });

    return notification;
  }
}
export default CreateNotificationService;
