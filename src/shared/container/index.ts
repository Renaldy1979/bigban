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
