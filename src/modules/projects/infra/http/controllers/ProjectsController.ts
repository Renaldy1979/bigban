import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import ListProjectsService from '@modules/projects/services/ListProjectsService';

export default class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({
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

    return response.json(project);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProjects = container.resolve(ListProjectsService);

    const projects = await listProjects.execute({
      user_id,
    });

    return response.json(projects);
  }
}
