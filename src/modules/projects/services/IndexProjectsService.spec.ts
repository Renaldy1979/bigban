import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import IndexProjectsService from './IndexProjectsService';

let fakeProjectsRepository: FakeProjectsRepository;
let indexProjects: IndexProjectsService;

describe('ListProjects', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    indexProjects = new IndexProjectsService(fakeProjectsRepository);
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
      internal_status: '',
      internal_book: '',
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
      internal_status: '',
      internal_book: '',
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
