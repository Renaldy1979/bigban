import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RoleController from '../controllers/RoleController';

const rolesRouter = Router();
const roleController = new RoleController();

rolesRouter.use(is([]));

rolesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  roleController.create,
);

rolesRouter.get('/', roleController.index);

rolesRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  roleController.update,
);

export default rolesRouter;
