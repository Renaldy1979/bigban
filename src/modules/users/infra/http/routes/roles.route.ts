import { Router } from 'express';
import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import RoleController from '../controllers/RoleController';

const rolesRouter = Router();
const roleController = new RoleController();

rolesRouter.use(is([]));

rolesRouter.post('/', roleController.create);

rolesRouter.get('/', roleController.index);

export default rolesRouter;
