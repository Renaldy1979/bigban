import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import PermissionsRepository from '@modules/users/infra/typeorm/repositories/PermissionsRepository';

import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';

import ICommentsRepository from '@modules/projects/repositories/ICommentsRepository';
import CommentsRepository from '@modules/projects/infra/typeorm/repositories/CommentsRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IStatusRepository from '@modules/projects/repositories/IStatusRepository';
import StatusRepository from '@modules/projects/infra/typeorm/repositories/StatusRepository';

import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository';
import UsersTokensRepository from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';

import ICommentTypeRepository from '@modules/projects/repositories/ICommentTypeRepository';
import CommentTypeRepository from '@modules/projects/infra/typeorm/repositories/CommentTypeRepository';

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<IStatusRepository>(
  'StatusRepository',
  StatusRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository,
);

container.registerSingleton<ICommentTypeRepository>(
  'CommentTypeRepository',
  CommentTypeRepository,
);
