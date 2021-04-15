import { v4 as uuidv4 } from 'uuid';

import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

import IProjectRepository from '@modules/projects/repositories/IProjectsRepository';

import IFindAllProjectsDTO from '@modules/projects/dtos/IFindAllProjectsDTO';

import Project from '@modules/projects/infra/typeorm/entities/Project';

class ProjectsRepository implements IProjectRepository {
  private projects: Project[] = [];

  public async findByCode(code: string): Promise<Project | undefined> {
    const findProjectCode = this.projects.find(
      project => project.code === code,
    );

    return findProjectCode;
  }

  public async create({
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
    created_by,
    updated_by,
  }: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    Object.assign(project, {
      id: uuidv4(),
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
      created_by,
      updated_by,
    });

    this.projects.push(project);

    return project;
  }

  public async findAllProjects({
    requester_id,
  }: IFindAllProjectsDTO): Promise<Project[]> {
    let { projects } = this;

    if (requester_id) {
      projects = this.projects.filter(
        project => project.requester_id === requester_id,
      );
    } else {
      projects = this.projects;
    }

    return projects;
  }
}

export default ProjectsRepository;
