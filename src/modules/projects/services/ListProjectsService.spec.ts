import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import ListProjectsService from './ListProjectsService';

let fakeProjectsRepository: FakeProjectsRepository;
let listProjects: ListProjectsService;

describe('ListProjects', () => {
  beforeEach(() => {
    fakeProjectsRepository = new FakeProjectsRepository();
    listProjects = new ListProjectsService(fakeProjectsRepository);
  });
  it('should be able to list all projects to logged user', async () => {
    const projectUser1 = await fakeProjectsRepository.create({
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

    const projectUser2 = await fakeProjectsRepository.create({
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

    await fakeProjectsRepository.create({
      name: 'Projeto Teste 01',
      code: 'DM2020143',
      initiative: '12MM',
      segment_priority: '',
      portfolio: '',
      effort: '',
      brief_description: '',
      justification: '',
      requester_id: '321',
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

    const projects = await listProjects.execute({
      user_id: projectUser1.requester_id,
    });

    expect(projects).toEqual([projectUser1, projectUser2]);
  });
});
