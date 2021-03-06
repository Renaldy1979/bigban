import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';

let fakeProjectsRepository: FakeProjectsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createProject: CreateProjectService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateProject', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createProject = new CreateProjectService(
      fakeProjectsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to create a new project', async () => {
    const project = await createProject.execute({
      name: 'Projeto Teste 01',
      code: 'DM2020145',
      initiative: '12MM',
      segment_priority: '',
      portfolio: '',
      effort: '',
      brief_description: 'breif description',
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
      status_id: '',
      creater_id: 'user-creater',
      updater_id: 'user-logged',
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
      brief_description: 'breaf description',
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
      status_id: '',
      creater_id: 'user-creater',
      updater_id: 'user-logged',
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
        status_id: '',
        creater_id: 'user-creater',
        updater_id: 'user-logged',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new project without the field brief-desciption', async () => {
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
        status_id: '',
        creater_id: 'user-creater',
        updater_id: 'user-logged',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
