import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import INofiticationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Project from '../infra/typeorm/entities/Project';

import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  name: string;
  code: string;
  initiative: string;
  segment_priority: string;
  portfolio: string;
  effort: string;
  brief_description: string;
  justification: string;
  requester_id: string;
  request_date: Date;
  scope_date: Date;
  shipping_date: Date;
  post_date: Date;
  rollout_date: Date;
  expectation_date: Date;
  validated_scope: string;
  responsible_status: string;
  status_id: string;
  userLogged: string;
}
@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INofiticationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    code,
    initiative,
    segment_priority,
    portfolio,
    effort,
    brief_description,
    justification,
    requester_id,
    request_date,
    scope_date,
    shipping_date,
    post_date,
    rollout_date,
    expectation_date,
    validated_scope,
    responsible_status,
    status_id,
    userLogged,
  }: IRequest): Promise<Project> {
    const findProjectsInSameCode = await this.projectsRepository.findByCode(
      code,
    );

    if (findProjectsInSameCode) {
      throw new AppError('This project is already booked');
    }

    if (!brief_description) {
      throw new AppError('the field brief-description was not informed');
    }

    const project = await this.projectsRepository.create({
      name,
      code,
      initiative,
      segment_priority,
      portfolio,
      effort,
      brief_description,
      justification,
      requester_id,
      request_date,
      scope_date,
      shipping_date,
      post_date,
      rollout_date,
      expectation_date,
      validated_scope,
      responsible_status,
      status_id,
      created_by: userLogged,
      updated_by: userLogged,
    });

    await this.notificationsRepository.create({
      recipient_id: requester_id,
      content: `Um novo projeto foi adicionado tendo você como solicitante`,
    });

    await this.cacheProvider.invalidatePrefix('projects-list');
    return project;
  }
}

export default CreateProjectService;
