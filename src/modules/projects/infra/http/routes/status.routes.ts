import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import StatusController from '../controllers/StatusController';

const statusRouter = Router();
const statusController = new StatusController();

statusRouter.use(is([]));

statusRouter.get('/', statusController.index);

statusRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      color: Joi.string().required(),
      order: Joi.number().required(),
    },
  }),
  statusController.create,
);

export default statusRouter;
