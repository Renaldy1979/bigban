import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notifications';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import INotificationsRepository from '../repositories/INotificationsRepository';

@injectable()
class UpdateAllNotificationsPerRecipientService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    recipient_id: string,
  ): Promise<Notification | undefined> {
    const checkUserExists = await this.usersRepository.findById(recipient_id);

    if (!checkUserExists) {
      throw new AppError('Recipient-ID not found');
    }

    const notification = await this.notificationsRepository.UpdateAllByRecipientId(
      recipient_id,
    );

    return notification;
  }
}

export default UpdateAllNotificationsPerRecipientService;
