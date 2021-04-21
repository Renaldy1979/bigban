import { v4 as uuidv4 } from 'uuid';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import IProjectRepository from '@modules/projects/repositories/IProjectsRepository';
import Project from '@modules/projects/infra/typeorm/entities/Project';

class ProjectsRepository implements IProjectRepository {
  private projects: Project[] = [];

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

  public async save(project: Project): Promise<Project> {
    const findIndex = this.projects.findIndex(
      findProject => findProject.id === project.id,
    );

    this.projects[findIndex] = project;
    return project;
  }

  public async index(): Promise<Project[]> {
    const { projects } = this;

    return projects;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.projects.findIndex(project => project.id === id);

    this.projects.splice(findIndex, 1);
  }

  public async show(id: string): Promise<Project | undefined> {
    const findProject = this.projects.find(project => project.id === id);

    return findProject;
  }

  public async findByCode(code: string): Promise<Project | undefined> {
    const findProjectCode = this.projects.find(
      project => project.code === code,
    );

    return findProjectCode;
  }
}

export default ProjectsRepository;
