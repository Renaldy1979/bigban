import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import WorkflowController from '../controllers/WorkflowController';

const workflowRouter = Router();
const workflowController = new WorkflowController();

workflowRouter.use(is([]));

workflowRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      date_opened: Joi.date().empty(''),
      date_closed: Joi.date().empty(''),
      status_id: Joi.string().required().uuid(),
      type_id: Joi.string().required().uuid(),
      requester_id: Joi.string().uuid(),
      code_in: Joi.string().empty(''),
      code_pb: Joi.string().empty(''),
      code_bug: Joi.string().empty(''),
      priority: Joi.string().empty(''),
      attribute_id: Joi.string().uuid().required(),
    },
  }),
  workflowController.create,
);

workflowRouter.get('/', workflowController.index);

workflowRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  workflowController.show,
);

export default workflowRouter;
