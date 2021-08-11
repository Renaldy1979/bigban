import { Router } from 'express';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import NotificationsController from '../controllers/NotificationsController';
import NotificationsRecipientController from '../controllers/NotificationsRecipientController';

const notificationRouter = Router();
const notificationsController = new NotificationsController();
const notificationsRecipientController = new NotificationsRecipientController();

notificationRouter.use(is([]));

notificationRouter.get('/', notificationsController.index);

notificationRouter.get('/:id', notificationsController.show);

notificationRouter.put(
  '/read',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  notificationsController.update,
);

notificationRouter.put(
  '/read-all',
  celebrate({
    [Segments.BODY]: {
      recipient_id: Joi.string().required().uuid(),
    },
  }),
  notificationsRecipientController.update,
);

notificationRouter.post(
  '',
  celebrate({
    [Segments.BODY]: {
      content: Joi.string().required(),
      read: Joi.boolean().required(),
      recipient_id: Joi.string().required(),
    },
  }),
  notificationsController.create,
);

export default notificationRouter;
