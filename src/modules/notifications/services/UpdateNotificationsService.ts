import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notifications';
import INotificationsRepository from '../repositories/INotificationsRepository';

@injectable()
class UpdateNotificationsService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute(id: string): Promise<Notification | undefined> {
    const notificationsExists = await this.notificationsRepository.findById(id);

    if (!notificationsExists) {
      throw new AppError('Notification-ID not found');
    }

    const notification = await this.notificationsRepository.findByIdAndUpdatedRead(
      id,
    );

    return notification;
  }
}

export default UpdateNotificationsService;
