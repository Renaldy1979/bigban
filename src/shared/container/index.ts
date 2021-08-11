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

import IAttributesRepository from '@modules/attributes/repositories/IAttributesRepository';
import AttributesRepository from '@modules/attributes/infra/typeorm/repositories/AttributesRepository';

import IAttributesStatusRepository from '@modules/attributes/repositories/IAttributesStatusRepository';
import AttributesStatusRepository from '@modules/attributes/infra/typeorm/repositories/AttributesStatusRepository';

import IAttributeInfDatabaseRepository from '@modules/attributes/repositories/IAttributeInfDatabaseRepository';
import AttributeInfDatabaseRepository from '@modules/attributes/infra/typeorm/repositories/AttributeInfDatabaseRepository';

import IWorkflowsRepository from '@modules/workflows/repositories/IWorkflowsRepository';
import WorkflowRepository from '@modules/workflows/infra/typeorm/repositories/WorkflowsRepository';

import IWorkflowsStatusRepository from '@modules/workflows/repositories/IWorkflowsStatusRepository';
import WorkflowStatusRepository from '@modules/workflows/infra/typeorm/repositories/WorkflowsStatusRepository';

import IWorkflowsTypeRepository from '@modules/workflows/repositories/IWorkflowsTypeRepository';
import WorkflowsTypeRepository from '@modules/workflows/infra/typeorm/repositories/WorkflowsTypeRepository';

import IWorkflowsAttributesRepository from '@modules/workflows/repositories/IWorkflowsAttributesRepository';
import WorkflowsAttributesRepository from '@modules/workflows/infra/typeorm/repositories/WorkflowsAttributesRepository';

import IWorkflowsEvolutionsRepository from '@modules/workflows/repositories/IWorkflowsEvolutionsRepository';
import WorkflowsEvolutionsRepository from '@modules/workflows/infra/typeorm/repositories/WorkflowsEvolutionsRepository';

import IAttributesOriginRepository from '@modules/attributes/repositories/IAttributesOriginRepository';
import AttributesOriginRepository from '@modules/attributes/infra/typeorm/repositories/AttributesOriginRepository';

import IAttributesSegmentRepository from '@modules/attributes/repositories/IAttributesSegmentRepository';
import AttributesSegmentRepository from '@modules/attributes/infra/typeorm/repositories/AttributesSegmentRepository';

import ISprintRepository from '@modules/sprints/repositories/ISprintRepository';
import SprintRepository from '@modules/sprints/infra/typeorm/repositories/SprintRepository';

import ISprintStatusRepository from '@modules/sprints/repositories/ISprintStatusRepository';
import SprintStatusRepository from '@modules/sprints/infra/typeorm/repositories/SprintStatusRepository';

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

container.registerSingleton<IAttributesRepository>(
  'AttributesRepository',
  AttributesRepository,
);

container.registerSingleton<IAttributesStatusRepository>(
  'AttributesStatusRepository',
  AttributesStatusRepository,
);

container.registerSingleton<IAttributeInfDatabaseRepository>(
  'AttributeInfDatabaseRepository',
  AttributeInfDatabaseRepository,
);

container.registerSingleton<IWorkflowsRepository>(
  'WorkflowsRepository',
  WorkflowRepository,
);

container.registerSingleton<IWorkflowsStatusRepository>(
  'WorkflowsStatusRepository',
  WorkflowStatusRepository,
);

container.registerSingleton<IWorkflowsTypeRepository>(
  'WorkflowsTypeRepository',
  WorkflowsTypeRepository,
);

container.registerSingleton<IWorkflowsAttributesRepository>(
  'WorkflowsAttributesRepository',
  WorkflowsAttributesRepository,
);

container.registerSingleton<IWorkflowsEvolutionsRepository>(
  'WorkflowsEvolutionsRepository',
  WorkflowsEvolutionsRepository,
);

container.registerSingleton<IAttributesOriginRepository>(
  'AttributesOriginRepository',
  AttributesOriginRepository,
);

container.registerSingleton<IAttributesSegmentRepository>(
  'AttributesSegmentRepository',
  AttributesSegmentRepository,
);

container.registerSingleton<ISprintRepository>(
  'SprintRepository',
  SprintRepository,
);

container.registerSingleton<ISprintStatusRepository>(
  'SprintStatusRepository',
  SprintStatusRepository,
);
