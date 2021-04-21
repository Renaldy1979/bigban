import { Router } from 'express';

import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.use(is([]));

projectsRouter.post('/', projectsController.create);

projectsRouter.get('/:id', projectsController.show);

projectsRouter.delete('/:id', projectsController.delete);

projectsRouter.get('/', projectsController.index);

projectsRouter.put('/', projectsController.update);

export default projectsRouter;
