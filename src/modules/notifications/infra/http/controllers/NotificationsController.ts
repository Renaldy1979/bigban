import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateNotificationService from '@modules/notifications/services/CreateNotificationService';
import IndexNotificationsService from '@modules/notifications/services/IndexNotificationsService';
import ShowNotificationsService from '@modules/notifications/services/ShowNotificationsService';
import UpdateNotificationsService from '@modules/notifications/services/UpdateNotificationsService';

export default class NotificationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { content, read, recipient_id } = request.body;

    const createUser = container.resolve(CreateNotificationService);

    const permission = await createUser.execute({
      content,
      read,
      recipient_id,
    });

    return response.json(permission);
  }

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;
    const updateNotifications = container.resolve(UpdateNotificationsService);

    const notifications = await updateNotifications.execute(id);

    return response.json(notifications);
  }
}
