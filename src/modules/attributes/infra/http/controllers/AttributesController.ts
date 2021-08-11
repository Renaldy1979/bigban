import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAttributeService from '@modules/attributes/services/CreateAttributeService';
import IndexAttributesService from '@modules/attributes/services/IndexAttributesService';
import ShowAttributeService from '@modules/attributes/services/ShowAttributeService';
import { classToClass } from 'class-transformer';

export default class AttributesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      segment_id,
      origin_id,
      requester_id,
      attribute_name,
      status_id,
    } = request.body;

    const createAttribute = container.resolve(CreateAttributeService);

    const attribute = await createAttribute.execute({
      segment_id,
      origin_id,
      requester_id,
      attribute_name,
      status_id,
    });

    return response.json(attribute);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexAttributes = container.resolve(IndexAttributesService);

    const attributes = await indexAttributes.execute();

    return response.json(classToClass(attributes));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAttributes = container.resolve(ShowAttributeService);

    const attribute = await showAttributes.execute(id);

    return response.json(classToClass(attribute));
  }
}
