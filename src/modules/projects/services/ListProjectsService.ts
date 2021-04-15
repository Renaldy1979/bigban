import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProjectsService {
  constructor(
    @inject('ProjectsRepository')
    private projectRepository: IProjectsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Project[]> {
    const projects = await this.projectRepository.findAllProjects({
      requester_id: user_id,
    });

    return projects;
  }
}

export default ListProjectsService;
