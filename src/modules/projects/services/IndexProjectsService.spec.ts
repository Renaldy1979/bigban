import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import IndexProjectsService from './IndexProjectsService';

let fakeProjectsRepository: FakeProjectsRepository;
let indexProjects: IndexProjectsService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProjects', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    indexProjects = new IndexProjectsService(
      fakeProjectsRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list all projects', async () => {
    const project1 = await fakeProjectsRepository.create({
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
      status_id: '',
      created_by: '',
      updated_by: '',
    });

    const project2 = await fakeProjectsRepository.create({
      name: 'Projeto Teste 01',
      code: 'DM2020141',
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
      status_id: '',
      created_by: '',
      updated_by: '',
    });

    const projects = await indexProjects.execute();

    expect(projects).toEqual([project1, project2]);
  });

  it('should be able to list all projects is empty', async () => {
    const projects = await indexProjects.execute();

    expect(projects).toEqual([]);
  });
});
