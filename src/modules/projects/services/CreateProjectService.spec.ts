import AppError from '@shared/errors/AppError';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';

let fakeProjectsRepository: FakeProjectsRepository;
let createProject: CreateProjectService;

describe('CreateProject', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();

    createProject = new CreateProjectService(fakeProjectsRepository);
  });
  it('should be able to create a new project', async () => {
    const project = await createProject.execute({
      name: 'Projeto Teste 01',
      code: 'DM2020145',
      initiative: '12MM',
      segment_priority: '',
      portfolio: '',
      effort: '',
      brief_description: '',
      justification: '',
      requester_id: '',
      request_date: new Date(),
      scope_date: new Date(),
      shipping_date: new Date(),
      post_date: new Date(),
      rollout_date: new Date(),
      expectation_date: new Date(),
      validated_scope: '',
      responsible_status: '',
      internal_status: '',
      internal_book: '',
      created_by: '',
      updated_by: '',
    });

    expect(project).toHaveProperty('id');
    expect(project.code).toBe('DM2020145');
  });

  it('should not be able to create a new project on the same code', async () => {
    await createProject.execute({
      name: 'Projeto Teste 02',
      code: '123456',
      initiative: '12MM',
      segment_priority: '',
      portfolio: '',
      effort: '',
      brief_description: '',
      justification: '',
      requester_id: '',
      request_date: new Date(),
      scope_date: new Date(),
      shipping_date: new Date(),
      post_date: new Date(),
      rollout_date: new Date(),
      expectation_date: new Date(),
      validated_scope: '',
      responsible_status: '',
      internal_status: '',
      internal_book: '',
      created_by: '',
      updated_by: '',
    });

    await expect(
      createProject.execute({
        name: 'Projeto Teste 02',
        code: '123456',
        initiative: '12MM',
        segment_priority: '',
        portfolio: '',
        effort: '',
        brief_description: '',
        justification: '',
        requester_id: '',
        request_date: new Date(),
        scope_date: new Date(),
        shipping_date: new Date(),
        post_date: new Date(),
        rollout_date: new Date(),
        expectation_date: new Date(),
        validated_scope: '',
        responsible_status: '',
        internal_status: '',
        internal_book: '',
        created_by: '',
        updated_by: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
