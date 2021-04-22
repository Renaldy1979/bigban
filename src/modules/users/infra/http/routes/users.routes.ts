import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const userAvatarController = new UserAvatarController();
const usersController = new UsersController();
const upload = multer(uploadConfig);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      roles: Joi.array().items(Joi.string().uuid().min(1)).required(),
    },
  }),
  usersController.create,
);

usersRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_id: Joi.string().uuid().required(),
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.string(),
      password: Joi.when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      password_confirmation: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref('password')).required(),
      }),
      roles: Joi.array().items(Joi.string().uuid()),
    },
  }),
  is(['ROLE_ADMIN', 'ROLE_USER']),
  usersController.save,
);

usersRouter.patch(
  '/avatar',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  upload.single('avatar'),
  userAvatarController.update,
);

usersRouter.get('/', is(['ROLE_ADMIN', 'ROLE_USER']), usersController.index);

usersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  is(['ROLE_ADMIN', 'ROLE_USER']),
  usersController.show,
);
usersRouter.get('/', is(['ROLE_ADMIN', 'ROLE_USER']), usersController.show);

export default usersRouter;
