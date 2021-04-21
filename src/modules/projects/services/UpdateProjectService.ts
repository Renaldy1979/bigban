import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
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
  internal_status?: string;
  internal_book?: string;
  userLogged: string;
}
@injectable()
class UpdateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
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
    internal_status,
    internal_book,
    userLogged,
  }: IRequest): Promise<Project> {
    const project = await this.projectsRepository.show(project_id);

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
      internal_status,
      internal_book,
      updated_by: userLogged,
    });

    return this.projectsRepository.save(project);
  }
}

export default UpdateProjectService;
