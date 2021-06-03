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

export default routes;
