import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCommentService from '@modules/projects/services/CreateCommentService';
import ShowCommentsService from '@modules/projects/services/ShowCommentsService';
import IndexCommentsInProjectService from '@modules/projects/services/IndexCommentsInProjectService';
import { classToClass } from 'class-transformer';

export default class CommentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description, project_id, type_id, creater_id } = request.body;

    const createComment = container.resolve(CreateCommentService);

    const project = await createComment.execute({
      description,
      project_id,
      creater_id,
      type_id,
    });

    return response.json(project);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showComments = container.resolve(ShowCommentsService);

    const comments = await showComments.execute(id);

    return response.json(comments);
  }

  public async indexInProjects(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const indexComments = container.resolve(IndexCommentsInProjectService);

    const comments = await indexComments.execute(id);

    return response.json(classToClass(comments));
  }
}
