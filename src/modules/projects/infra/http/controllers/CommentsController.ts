import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCommentService from '@modules/projects/services/CreateCommentService';

export default class CommentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description, project_id } = request.body;

    const userLoggerd = request.user.id;

    const createComment = container.resolve(CreateCommentService);

    const project = await createComment.execute({
      description,
      project_id,
      creater_id: userLoggerd,
    });

    return response.json(project);
  }
}
