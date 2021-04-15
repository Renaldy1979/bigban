import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.use(ensureAuthenticated);

projectsRouter.post('/', projectsController.create);

projectsRouter.get('/', projectsController.index);

export default projectsRouter;
