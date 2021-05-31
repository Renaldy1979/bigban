import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CommentTypeController from '../controllers/CommentTypeController';

const commentsTypeRouter = Router();
const commentsTypeController = new CommentTypeController();

commentsTypeRouter.use(is([]));

commentsTypeRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      color: Joi.string().required(),
      component: Joi.string().required(),
    },
  }),
  commentsTypeController.create,
);

commentsTypeRouter.get('/', commentsTypeController.index);

export default commentsTypeRouter;
