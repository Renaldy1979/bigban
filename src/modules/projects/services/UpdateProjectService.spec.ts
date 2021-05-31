import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import UpdateProjectService from './UpdateProjectService';

let fakeProjectsRepository: FakeProjectsRepository;
let updateProject: UpdateProjectService;
let fakeCacheProvider: FakeCacheProvider;

describe('UpdateProject', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    updateProject = new UpdateProjectService(
      fakeProjectsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to update the project', async () => {
    const project = await fakeProjectsRepository.create({
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
      status_id: '',
      created_by: 'user-logged',
      updated_by: 'user-logged',
    });

    const projectUpdated = await updateProject.execute({
      project_id: project.id,
      name: 'Projeto Teste 01 - Updated',
      code: 'DM2020145 - Updated',
      initiative: '12MM - Updated',
      segment_priority: 'Updated',
      portfolio: 'Updated',
      effort: 'Updated',
      brief_description: 'Updated',
      justification: 'Updated',
      requester_id: 'Updated',
      request_date: new Date(),
      scope_date: new Date(),
      shipping_date: new Date(),
      post_date: new Date(),
      rollout_date: new Date(),
      expectation_date: new Date(),
      validated_scope: 'Updated',
      responsible_status: 'Updated',
      status_id: 'Updated',
      userLogged: 'user-logged',
    });

    expect(projectUpdated.name).toBe('Projeto Teste 01 - Updated');
    expect(projectUpdated.code).toBe('DM2020145 - Updated');
  });

  it('should not be able to update the project non-exists-project-id', async () => {
    await fakeProjectsRepository.create({
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
      status_id: '',
      created_by: '',
      updated_by: '',
    });

    await expect(
      updateProject.execute({
        project_id: 'non-exists-project-id',
        name: 'Projeto Teste 01 - Updated',
        code: 'DM2020145 - Updated',
        initiative: '12MM - Updated',
        segment_priority: 'Updated',
        portfolio: 'Updated',
        effort: 'Updated',
        brief_description: 'Updated',
        justification: 'Updated',
        requester_id: 'Updated',
        request_date: new Date(),
        scope_date: new Date(),
        shipping_date: new Date(),
        post_date: new Date(),
        rollout_date: new Date(),
        expectation_date: new Date(),
        validated_scope: 'Updated',
        responsible_status: 'Updated',
        status_id: 'Updated',
        userLogged: 'user-logged',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the project without code', async () => {
    const project = await fakeProjectsRepository.create({
      name: 'Projeto Teste 01',
      code: 'CODE',
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
      created_by: '',
      updated_by: '',
    });

    await updateProject.execute({
      project_id: project.id,
      name: 'Projeto Teste 01 - Updated',
      code: '',
      initiative: '12MM - Updated',
      segment_priority: 'Updated',
      portfolio: 'Updated',
      effort: 'Updated',
      brief_description: 'Updated',
      justification: 'Updated',
      requester_id: 'Updated',
      request_date: new Date(),
      scope_date: new Date(),
      shipping_date: new Date(),
      post_date: new Date(),
      rollout_date: new Date(),
      expectation_date: new Date(),
      validated_scope: 'Updated',
      responsible_status: 'Updated',
      status_id: 'Updated',
      userLogged: 'user-logged',
    });

    expect(project.code).toEqual('');
  });

  it('should not be able to update the project with the same code the different id', async () => {
    const project1 = await fakeProjectsRepository.create({
      name: 'Projeto Teste 01',
      code: 'code-one',
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
      created_by: '',
      updated_by: '',
    });

    await fakeProjectsRepository.create({
      name: 'Projeto Teste 01',
      code: 'code-two',
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
      created_by: '',
      updated_by: '',
    });

    await expect(
      updateProject.execute({
        project_id: project1.id,
        name: 'Projeto Teste 01 - Updated',
        code: 'code-two',
        initiative: '12MM - Updated',
        segment_priority: 'Updated',
        portfolio: 'Updated',
        effort: 'Updated',
        brief_description: 'Updated',
        justification: 'Updated',
        requester_id: 'Updated',
        request_date: new Date(),
        scope_date: new Date(),
        shipping_date: new Date(),
        post_date: new Date(),
        rollout_date: new Date(),
        expectation_date: new Date(),
        validated_scope: 'Updated',
        responsible_status: 'Updated',
        status_id: 'Updated',
        userLogged: 'user-logged',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
