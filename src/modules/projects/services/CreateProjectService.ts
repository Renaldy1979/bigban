import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Project from '../infra/typeorm/entities/Project';

import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  name: string;
  code: string;
  initiative: string;
  segment_priority: string;
  portfolio: string;
  effort: string;
  brief_description: string;
  justification: string;
  requester_id: string;
  request_date: Date;
  scope_date: Date;
  shipping_date: Date;
  post_date: Date;
  rollout_date: Date;
  expectation_date: Date;
  validated_scope: string;
  responsible_status: string;
  internal_status: string;
  internal_book: string;
  created_by: string;
  updated_by: string;
}
@injectable()
class CreateProjectService {
  constructor(
    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({
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
    created_by,
    updated_by,
  }: IRequest): Promise<Project> {
    const findProjectsInSameCode = await this.projectsRepository.findByCode(
      code,
    );

    if (findProjectsInSameCode) {
      throw new AppError('This project is already booked');
    }

    const project = await this.projectsRepository.create({
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
      created_by,
      updated_by,
    });

    return project;
  }
}

export default CreateProjectService;
