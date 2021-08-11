import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import WorkflowTypeController from '../controllers/WorkflowTypeController';

const workflowRouter = Router();
const workflowTypeController = new WorkflowTypeController();

workflowRouter.use(is([]));

workflowRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  workflowTypeController.create,
);

workflowRouter.get('/', workflowTypeController.index);

export default workflowRouter;
