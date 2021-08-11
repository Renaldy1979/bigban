import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import WorkflowAttributeController from '../controllers/WorkflowAttributeController';

const workflowRouter = Router();
const workflowAttributeController = new WorkflowAttributeController();

workflowRouter.use(is([]));

workflowRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      workflow_id: Joi.string().required().uuid(),
      attribute_id: Joi.string().required().uuid(),
    },
  }),
  workflowAttributeController.create,
);

workflowRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  workflowAttributeController.show,
);

workflowRouter.get('/', workflowAttributeController.index);

export default workflowRouter;
