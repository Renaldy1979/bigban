import { Router } from 'express';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import NotificationsController from '../controllers/NotificationsController';

const notificationRouter = Router();
const notificationsController = new NotificationsController();

notificationRouter.use(is([]));

notificationRouter.get('/', notificationsController.index);

notificationRouter.get('/:id', notificationsController.show);

export default notificationRouter;
