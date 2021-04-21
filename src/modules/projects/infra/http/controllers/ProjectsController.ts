import { Request, Response } from 'express';
import { container } from 'tsyringe';
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
      internal_status,
      internal_book,
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
      internal_status,
      internal_book,
      userLogged,
    });

    return response.json(project);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProjects = container.resolve(ShowProjectsService);

    const showProject = await showProjects.execute(id);

    const project = {
      project_id: showProject.id,
      name: showProject.name,
      code: showProject.code,
      initiative: showProject.initiative,
      segment_priority: showProject.segment_priority,
      portfolio: showProject.portfolio,
      effort: showProject.effort,
      brief_description: showProject.brief_description,
      justification: showProject.justification,
      requester: [showProject.requester.id, showProject.requester.name],
      request_date: showProject.request_date,
      scope_date: showProject.scope_date,
      shipping_date: showProject.shipping_date,
      post_date: showProject.post_date,
      rollout_date: showProject.rollout_date,
      expectation_date: showProject.expectation_date,
      validated_scope: showProject.validated_scope,
      responsible_status: showProject.responsible_status,
      internal_status: showProject.internal_status,
      internal_book: showProject.internal_book,
      created_by: showProject.created_by,
      created_at: showProject.created_at,
      updated_by: showProject.updated_by,
      updated_at: showProject.updated_at,
    };

    return response.json(project);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const showProjects = container.resolve(IndexProjectsService);

    const projects = await showProjects.execute();

    return response.json(projects);
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
      internal_status,
      internal_book,
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
      internal_status,
      internal_book,
      userLogged,
    });

    return response.json(project);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProjects = container.resolve(DeleteProjectService);

    const projects = await deleteProjects.execute(id);

    return response.json(projects);
  }
}
