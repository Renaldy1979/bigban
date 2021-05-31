import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCommentTypeService from '@modules/projects/services/CreateCommentTypeService';
import IndexCommentTypeService from '@modules/projects/services/IndexCommentTypeService';

export default class CommentTypeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description, color, component } = request.body;

    const createCommentType = container.resolve(CreateCommentTypeService);

    const commentType = await createCommentType.execute({
      description,
      color,
      component,
    });

    return response.json(commentType);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexCommentType = container.resolve(IndexCommentTypeService);

    const commentType = await indexCommentType.execute();

    return response.json(commentType);
  }
}
