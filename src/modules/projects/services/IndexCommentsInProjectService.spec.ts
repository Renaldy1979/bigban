import FakeCommentsRepository from '@modules/projects/repositories/fakes/FakeCommentsRepository';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import IndexCommentsInProjectService from './IndexCommentsInProjectService';

let fakeCommentsRepository: FakeCommentsRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let showComments: IndexCommentsInProjectService;

describe('IndexCommentsInProjectService', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
    showComments = new IndexCommentsInProjectService(
      fakeCommentsRepository,
      fakeProjectsRepository,
    );
  });
  it('should be able to show the comments', async () => {
    const commentOne = await fakeCommentsRepository.create({
      creater_id: 'user-logado-one',
      description: 'Description about the projet number 1',
      project_id: '1',
      type_id: 'alert',
    });

    await showComments.execute(commentOne.project_id);

    expect(commentOne.creater_id).toBe('user-logado-one');
  });
});
