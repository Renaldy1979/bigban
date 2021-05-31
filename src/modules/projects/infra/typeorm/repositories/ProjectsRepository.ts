import { getRepository, Repository } from 'typeorm';

import IProjectRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

import Project from '@modules/projects/infra/typeorm/entities/Project';

class ProjectsRepository implements IProjectRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async create(projectData: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create(projectData);

    await this.ormRepository.save(project);

    return project;
  }

  public async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }

  public async index(): Promise<Project[]> {
    const projects = await this.ormRepository.find({
      relations: ['requester', 'creater', 'updater', 'status', 'comments'],
    });
    return projects;
  }

  public async delete(id: string): Promise<boolean> {
    await this.ormRepository.delete(id);
    return true;
  }

  public async show(id: string): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne({
      where: { id },
      relations: ['requester', 'creater', 'updater', 'status', 'comments'],
    });

    return findProject;
  }

  public async findByCode(code: string): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne({ where: { code } });

    return findProject;
  }

  public async findById(id: string): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne({ where: { id } });

    return findProject;
  }
}

export default ProjectsRepository;
