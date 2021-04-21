import AppError from '@shared/errors/AppError';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import DeleteProjectService from './DeleteProjectService';

let fakeProjectsRepository: FakeProjectsRepository;
let deleteProject: DeleteProjectService;

describe('DeleteProject', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    deleteProject = new DeleteProjectService(fakeProjectsRepository);
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
      internal_status: '',
      internal_book: '',
      created_by: '',
      updated_by: '',
    });

    const response = await deleteProject.execute(project.id);

    expect(response).toBeUndefined();
  });

  it('should be able to delete the project', async () => {
    const nullProjectId = '';

    expect(deleteProject.execute(nullProjectId)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
