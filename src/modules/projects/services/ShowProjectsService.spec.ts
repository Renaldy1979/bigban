import AppError from '@shared/errors/AppError';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import ShowProjectsService from './ShowProjectsService';

let fakeProjectsRepository: FakeProjectsRepository;
let showProjects: ShowProjectsService;

describe('ShowProjects', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    showProjects = new ShowProjectsService(fakeProjectsRepository);
  });
  it('should be able to show the project', async () => {
    const project = await fakeProjectsRepository.create({
      name: 'Projeto Teste 01',
      code: 'DM2020140',
      initiative: '12MM',
      segment_priority: '',
      portfolio: '',
      effort: '',
      brief_description: '',
      justification: '',
      requester_id: '123',
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

    const projectSelectd = await showProjects.execute(project.id);

    expect(projectSelectd.name).toBe('Projeto Teste 01');
    expect(projectSelectd.code).toBe('DM2020140');
  });

  it('should not be able to show project without project-id', async () => {
    const nullProjectId = '';

    expect(showProjects.execute(nullProjectId)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to show project with wrong-project-id', async () => {
    await fakeProjectsRepository.create({
      name: 'Projeto Teste 01',
      code: 'DM2020140',
      initiative: '12MM',
      segment_priority: '',
      portfolio: '',
      effort: '',
      brief_description: '',
      justification: '',
      requester_id: '123',
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

    expect(showProjects.execute('wrong-project-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
