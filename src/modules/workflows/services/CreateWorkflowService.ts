import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAttributesRepository from '@modules/attributes/repositories/IAttributesRepository';
import Workflow from '../infra/typeorm/entities/Workflow';

import IWorkflowsRepository from '../repositories/IWorkflowsRepository';
import IWorkflowsStatusRepository from '../repositories/IWorkflowsStatusRepository';
import IWorkflowsTypeRepository from '../repositories/IWorkflowsTypeRepository';
import IWorkflowsAttributesRepository from '../repositories/IWorkflowsAttributesRepository';
import IWorkflowsEvolutionsRepository from '../repositories/IWorkflowsEvolutionsRepository';

interface IRequest {
  description: string;
  date_opened: string;
  date_closed: string;
  status_id: string;
  code_in: string;
  code_pb: string;
  code_bug: string;
  priority: string;
  type_id: string;
  requester_id: string;
  creater_id: string;
  updater_id: string;
  attribute_id: string;
}
@injectable()
class CreateWorkflowService {
  constructor(
    @inject('WorkflowsRepository')
    private workflowsRepository: IWorkflowsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('WorkflowsStatusRepository')
    private workflowsStatusRepository: IWorkflowsStatusRepository,

    @inject('WorkflowsTypeRepository')
    private workflowsTypeRepository: IWorkflowsTypeRepository,

    @inject('WorkflowsAttributesRepository')
    private workflowsAttributesRepository: IWorkflowsAttributesRepository,

    @inject('AttributesRepository')
    private attributesRepository: IAttributesRepository,

    @inject('WorkflowsEvolutionsRepository')
    private workflowsEvolutionsRepository: IWorkflowsEvolutionsRepository,
  ) {}

  public async execute({
    description,
    date_opened,
    date_closed,
    status_id,
    code_in,
    code_pb,
    code_bug,
    attribute_id,
    priority,
    type_id,
    requester_id,
    creater_id,
    updater_id,
  }: IRequest): Promise<Workflow> {
    const checkStatusExists = await this.workflowsStatusRepository.findById(
      status_id,
    );

    if (!checkStatusExists) {
      throw new AppError('Status-id not Exists');
    }

    const checkTypeExists = await this.workflowsTypeRepository.findById(
      type_id,
    );
    if (!checkTypeExists) {
      throw new AppError('Type-id request not exists');
    }

    if (!creater_id) {
      throw new AppError('User creater not found or not Exists');
    }

    if (requester_id) {
      const checkRequesterExists = await this.usersRepository.findById(
        requester_id,
      );

      if (!checkRequesterExists) {
        throw new AppError('User requester not found or not exists');
      }
    }

    const checkAttributeListExists = await this.attributesRepository.findByAttributeId(
      attribute_id,
    );

    if (!checkAttributeListExists) {
      throw new AppError('Attributes not found.');
    }
    const workflow = await this.workflowsRepository.create({
      description,
      date_opened,
      date_closed,
      status_id,
      code_in,
      code_pb,
      code_bug,
      priority,
      type_id,
      requester_id,
      creater_id,
      updater_id,
    });

    await this.workflowsAttributesRepository.create({
      workflow_id: workflow.id,
      attribute_id,
    });

    await this.workflowsEvolutionsRepository.create({
      workflow_id: workflow.id,
      description: 'Workflow criado',
      creater_id,
    });

    return workflow;
  }
}

export default CreateWorkflowService;
