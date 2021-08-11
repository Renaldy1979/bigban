import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import WorkflowEvolutionsController from '../controllers/WorkflowEvolutionsController';

const workflowRouter = Router();
const workflowEvolutionsController = new WorkflowEvolutionsController();

workflowRouter.use(is([]));

workflowRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      workflow_id: Joi.string().required().uuid(),
    },
  }),
  workflowEvolutionsController.create,
);

workflowRouter.get('/', workflowEvolutionsController.index);

workflowRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  workflowEvolutionsController.show,
);
export default workflowRouter;
