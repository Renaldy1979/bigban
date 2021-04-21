import { Router } from 'express';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(is([]));

profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
