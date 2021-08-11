import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexAttributeOriginService from '@modules/attributes/services/IndexAttributeOriginService';

export default class AttributesOriginController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexAttributesOrigin = container.resolve(
      IndexAttributeOriginService,
    );

    const origin = await indexAttributesOrigin.execute();

    return response.json(origin);
  }
}
