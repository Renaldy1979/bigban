import INofiticationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Project from '../infra/typeorm/entities/Project';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  project_id: string;
  name: string;
  code?: string;
  initiative?: string;
  segment_priority?: string;
  portfolio?: string;
  effort?: string;
  brief_description?: string;
  justification?: string;
  requester_id?: string;
  request_date?: Date;
  scope_date?: Date;
  shipping_date?: Date;
  post_date?: Date;
  rollout_date?: Date;
  expectation_date?: Date;
  validated_scope?: string;
  responsible_status?: string;
  status_id?: string;
  userLogged: string;
}
@injectable()
class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INofiticationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    project_id,
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
    const project = await this.projectsRepository.findById(project_id);
    let infoProject = '';

    if (!project) {
      throw new AppError('Project not found.');
    }

    if (code) {
      const findProjectsInSameCode = await this.projectsRepository.findByCode(
        code,
      );

      if (findProjectsInSameCode && findProjectsInSameCode.id !== project_id) {
        throw new AppError('There is already a project with this code');
      }
    }

    Object.assign(project, {
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
      updated_by: userLogged,
    });

    await this.projectsRepository.save(project);

    if (project.code) {
      infoProject = `${project.code} - ${project.name}`;
    } else {
      infoProject = `${project.name}`;
    }

    await this.notificationsRepository.create({
      recipient_id: project.requester_id,
      content: `Houve uma atualização no projeto ${infoProject}`,
    });

    await this.cacheProvider.invalidatePrefix('projects-list');

    return project;
  }
}

export default UpdateProjectService;
