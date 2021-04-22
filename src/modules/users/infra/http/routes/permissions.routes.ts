import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PermissionController from '../controllers/PermissionController';

const permissionsRouter = Router();
const permissionController = new PermissionController();

permissionsRouter.use(is([]));

permissionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  permissionController.create,
);

permissionsRouter.get('/', permissionController.index);

permissionsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  permissionController.update,
);

export default permissionsRouter;
