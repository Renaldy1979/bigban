import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexAttributeStatusService from '@modules/attributes/services/IndexAttributeStatusService';

export default class AttributesStatusController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexAttributesStatus = container.resolve(
      IndexAttributeStatusService,
    );

    const status = await indexAttributesStatus.execute();

    return response.json(status);
  }
}
