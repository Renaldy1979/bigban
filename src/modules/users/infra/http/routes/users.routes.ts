import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const userAvatarController = new UserAvatarController();
const usersController = new UsersController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.put('/', is(['ROLE_ADMIN', 'ROLE_USER']), usersController.save);

usersRouter.patch(
  '/avatar',
  is(['ROLE_ADMIN', 'ROLE_USER']),
  upload.single('avatar'),
  userAvatarController.update,
);

usersRouter.get('/', is(['ROLE_ADMIN', 'ROLE_USER']), usersController.index);

usersRouter.get('/:id', is(['ROLE_ADMIN', 'ROLE_USER']), usersController.show);
usersRouter.get('/', is(['ROLE_ADMIN', 'ROLE_USER']), usersController.show);

export default usersRouter;
