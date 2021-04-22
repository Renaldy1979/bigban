import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.use(is([]));

projectsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      code: Joi.string(),
      initiative: Joi.string(),
      segment_priority: Joi.string(),
      portfolio: Joi.string(),
      effort: Joi.string(),
      brief_description: Joi.string().required(),
      justification: Joi.string(),
      requester_id: Joi.string().uuid(),
      request_date: Joi.date(),
      scope_date: Joi.date(),
      shipping_date: Joi.date(),
      post_date: Joi.date(),
      rollout_date: Joi.date(),
      expectation_date: Joi.date(),
      validated_scope: Joi.string(),
      responsible_status: Joi.string(),
      internal_status: Joi.string(),
      internal_book: Joi.string(),
    },
  }),
  projectsController.create,
);

projectsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  projectsController.show,
);

projectsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  projectsController.delete,
);

projectsRouter.get('/', projectsController.index);

projectsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      code: Joi.string(),
      initiative: Joi.string(),
      segment_priority: Joi.string(),
      portfolio: Joi.string(),
      effort: Joi.string(),
      brief_description: Joi.string().required(),
      justification: Joi.string(),
      requester_id: Joi.string().uuid(),
      request_date: Joi.date(),
      scope_date: Joi.date(),
      shipping_date: Joi.date(),
      post_date: Joi.date(),
      rollout_date: Joi.date(),
      expectation_date: Joi.date(),
      validated_scope: Joi.string(),
      responsible_status: Joi.string(),
      internal_status: Joi.string(),
      internal_book: Joi.string(),
    },
  }),
  projectsController.update,
);

export default projectsRouter;
