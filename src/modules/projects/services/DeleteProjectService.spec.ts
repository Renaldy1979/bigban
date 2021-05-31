import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import DeleteProjectService from './DeleteProjectService';

let fakeProjectsRepository: FakeProjectsRepository;
let deleteProject: DeleteProjectService;
let fakeCacheProvider: FakeCacheProvider;

describe('DeleteProject', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    deleteProject = new DeleteProjectService(
      fakeProjectsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to delete the project', async () => {
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
      created_by: '',
      updated_by: '',
    });

    const response = await deleteProject.execute(project.id);

    expect(response).toEqual(true);
  });

  it('should be able to delete the project', async () => {
    const nullProjectId = '';

    expect(deleteProject.execute(nullProjectId)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to delete the project with project_id not format uuid', async () => {
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
      deleteProject.execute('project-id-non-format-uuid'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete the project with project_id not found', async () => {
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
      deleteProject.execute('71d560e6-e982-49a9-b292-9d6f72775a32'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
