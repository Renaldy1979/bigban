import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import ShowProjectsService from '@modules/projects/services/ShowProjectsService';
import UpdateProjectService from '@modules/projects/services/UpdateProjectService';
import IndexProjectsService from '@modules/projects/services/IndexProjectsService';
import DeleteProjectService from '@modules/projects/services/DeleteProjectService';

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
      status_id,
    } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const userLogged = request.user.id;

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
      status_id,
      creater_id: userLogged,
      updater_id: userLogged,
    });

    return response.json(classToClass(project));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProjects = container.resolve(ShowProjectsService);

    const project = await showProjects.execute(id);

    return response.json(classToClass(project));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const showProjects = container.resolve(IndexProjectsService);

    const projects = await showProjects.execute();

    return response.json(classToClass(projects));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
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
    } = request.body;

    const updateProject = container.resolve(UpdateProjectService);
    const userLogged = request.user.id;
    const project = await updateProject.execute({
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
      updater_id: userLogged,
    });

    return response.json(classToClass(project));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProjects = container.resolve(DeleteProjectService);

    const projects = await deleteProjects.execute(id);

    return response.status(200).json({ message: projects });
  }
}
