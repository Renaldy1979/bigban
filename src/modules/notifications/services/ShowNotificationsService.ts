import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notifications from '@modules/notifications/infra/typeorm/schemas/Notifications';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowNotificationsService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute(recipient_id: string): Promise<Notifications[]> {
    if (!recipient_id) {
      throw new AppError('Recipient-ID is null');
    }
    const notifications = await this.notificationsRepository.findByRecipientId(
      recipient_id,
    );

    if (!notifications) {
      throw new AppError('Notifications not found');
    }
    return notifications;
  }
}

export default ShowNotificationsService;
