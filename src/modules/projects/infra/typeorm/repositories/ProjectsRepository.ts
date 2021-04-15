import { getRepository, Repository } from 'typeorm';

import IProjectRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';
import IFindAllProjectsDTO from '@modules/projects/dtos/IFindAllProjectsDTO';

import Project from '@modules/projects/infra/typeorm/entities/Project';

class ProjectsRepository implements IProjectRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findByCode(code: string): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne({ where: { code } });

    return findProject;
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
    const project = this.ormRepository.create({
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

    await this.ormRepository.save(project);

    return project;
  }

  public async findAllProjects({
    requester_id,
  }: IFindAllProjectsDTO): Promise<Project[]> {
    let projects: Project[];

    if (requester_id) {
      projects = await this.ormRepository.find({
        where: { requester_id },
      });
    } else {
      projects = await this.ormRepository.find();
    }

    return projects;
  }
}

export default ProjectsRepository;
