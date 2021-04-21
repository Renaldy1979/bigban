import { Router } from 'express';
import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PermissionController from '../controllers/PermissionController';

const permissionsRouter = Router();
const permissionController = new PermissionController();

permissionsRouter.use(is([]));

permissionsRouter.post('/', permissionController.create);

export default permissionsRouter;
