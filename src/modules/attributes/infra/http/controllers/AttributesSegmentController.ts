import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexAttributeSegmentService from '@modules/attributes/services/IndexAttributeSegmentService';

export default class AttributesSegmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexAttributesSegment = container.resolve(
      IndexAttributeSegmentService,
    );

    const segments = await indexAttributesSegment.execute();

    return response.json(segments);
  }
}
