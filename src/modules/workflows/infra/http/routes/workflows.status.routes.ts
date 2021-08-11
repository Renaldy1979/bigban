import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import WorkflowStatusController from '../controllers/WorkflowStatusController';

const workflowRouter = Router();
const workflowStatusController = new WorkflowStatusController();

workflowRouter.use(is([]));

workflowRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      is_error: Joi.string().required(),
    },
  }),
  workflowStatusController.create,
);

workflowRouter.get('/', workflowStatusController.index);

export default workflowRouter;
