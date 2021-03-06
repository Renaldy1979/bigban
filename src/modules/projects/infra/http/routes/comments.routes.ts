import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CommentsController from '../controllers/CommentsController';

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.use(is([]));

commentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      project_id: Joi.string().uuid().required(),
      type_id: Joi.string().required(),
      creater_id: Joi.string().required(),
    },
  }),
  commentsController.create,
);

commentsRouter.get('/:id', commentsController.show);

commentsRouter.get('/project/:id', commentsController.indexInProjects);

export default commentsRouter;
