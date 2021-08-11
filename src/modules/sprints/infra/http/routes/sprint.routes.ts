import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SprintController from '../controllers/SprintController';

const sprintRouter = Router();
const sprintController = new SprintController();

sprintRouter.use(is([]));

sprintRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      status_id: Joi.string().uuid().required(),
    },
  }),
  sprintController.create,
);
sprintRouter.get('/', sprintController.index);

sprintRouter.get('/:id', sprintController.show);

export default sprintRouter;
