import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAllNotificationsPerRecipientService from '@modules/notifications/services/UpdateAllNotificationsPerRecipientService';

export default class NotificationsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { recipient_id } = request.body;
    const updateNotifications = container.resolve(
      UpdateAllNotificationsPerRecipientService,
    );

    const notifications = await updateNotifications.execute(recipient_id);

    return response.json(notifications);
  }
}
