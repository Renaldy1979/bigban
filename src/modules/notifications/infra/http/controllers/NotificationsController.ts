import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexNotificationsService from '@modules/notifications/services/IndexNotificationsService';
import ShowNotificationsService from '@modules/notifications/services/ShowNotificationsService';

export default class NotificationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexNotifications = container.resolve(IndexNotificationsService);

    const status = await indexNotifications.execute();

    return response.json(status);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showNotifications = container.resolve(ShowNotificationsService);

    const notifications = await showNotifications.execute(id);

    return response.json(notifications);
  }
}
