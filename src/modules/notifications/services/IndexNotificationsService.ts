import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notifications from '@modules/notifications/infra/typeorm/schemas/Notifications';
import { inject, injectable } from 'tsyringe';

@injectable()
class IndexNotificationsService {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
  ) {}

  public async execute(): Promise<Notifications[]> {
    const notifications = await this.notificationsRepository.index();

    return notifications;
  }
}

export default IndexNotificationsService;
