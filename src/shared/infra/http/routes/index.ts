import { Router } from 'express';
import projectsRouter from '@modules/projects/infra/http/routes/projects.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import permissionRouter from '@modules/users/infra/http/routes/permissions.routes';
import roleRouter from '@modules/users/infra/http/routes/roles.route';
import commentRouter from '@modules/projects/infra/http/routes/comments.routes';
import statusRouter from '@modules/projects/infra/http/routes/status.routes';
import commentTypeRouter from '@modules/projects/infra/http/routes/commentType.routes';
import notificationsRouter from '@modules/notifications/infra/http/routes/notifications.routes';
import attributesRouter from '@modules/attributes/infra/http/routes/attribute.routes';
import attributesInfRouter from '@modules/attributes/infra/http/routes/attributeInfDatabase.routes';
import workflowRouter from '@modules/workflows/infra/http/routes/workflows.routes';
import workflowAttributesRouter from '@modules/workflows/infra/http/routes/workflows.attributes.routes';
import workflowTypesRouter from '@modules/workflows/infra/http/routes/workflows.types.routes';
import workflowEvolutionsRouter from '@modules/workflows/infra/http/routes/workflows.evolutions.routes';
import workflowStatusRouter from '@modules/workflows/infra/http/routes/workflows.status.routes';
import sprintRouter from '@modules/sprints/infra/http/routes/sprint.routes';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/permissions', permissionRouter);
routes.use('/roles', roleRouter);
routes.use('/comments', commentRouter);
routes.use('/status', statusRouter);
routes.use('/comment-type', commentTypeRouter);
routes.use('/notifications', notificationsRouter);
routes.use('/attributes', attributesRouter);
routes.use('/attributes-inf-database', attributesInfRouter);
routes.use('/workflows', workflowRouter);
routes.use('/workflows-attributes', workflowAttributesRouter);
routes.use('/workflows-types', workflowTypesRouter);
routes.use('/workflows-evolutions', workflowEvolutionsRouter);
routes.use('/workflows-status', workflowStatusRouter);

routes.use('/sprints', sprintRouter);

export default routes;
