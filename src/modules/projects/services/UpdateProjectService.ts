import INofiticationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICommentsRepository from '@modules/projects/repositories/ICommentsRepository';
import IStatusRepository from '@modules/projects/repositories/IStatusRepository';
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
  updater_id: string;
}
@injectable()
class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INofiticationsRepository,

    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,

    @inject('StatusRepository')
    private statusRepository: IStatusRepository,
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
    updater_id,
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

    if (project.code) {
      infoProject = `${project.code} - ${project.name}`;
    } else {
      infoProject = `${project.name}`;
    }

    await this.notificationsRepository.create({
      recipient_id: project.requester_id,
      content: `Houve uma atualização no projeto ${infoProject}`,
      read: false,
    });

    if (status_id) {
      const oldStatus = await this.statusRepository.findById(project.status_id);
      const newStatus = await this.statusRepository.findById(status_id);

      await this.commentsRepository.create({
        creater_id: updater_id,
        description: `Alteração de Status. DE: ${oldStatus?.description} / PARA: ${newStatus?.description}`,
        project_id,
        type_id: '4bfc4add-1406-4388-8703-633508c4fa2a',
      });
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
      updater_id,
    });

    await this.projectsRepository.save(project);

    return project;
  }
}

export default UpdateProjectService;
