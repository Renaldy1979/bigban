import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowAttributeInfDatabaseService from '@modules/attributes/services/ShowAttributeInfDatabaseService';

import { classToClass } from 'class-transformer';

export default class AttributeInfDatabaseController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAttributesInf = container.resolve(
      ShowAttributeInfDatabaseService,
    );

    const attributeInf = await showAttributesInf.execute(id);

    return response.json(classToClass(attributeInf));
  }
}
