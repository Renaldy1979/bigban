import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import AppError from '@shared/errors/AppError';
import FakeCommentsRepository from '../repositories/fakes/FakeCommentsRepository';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateCommentService from './CreateCommentService';

let fakeCommentsRepository: FakeCommentsRepository;
let fakeProjectsRepository: FakeProjectsRepository;
let createComment: CreateCommentService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateComment', () => {
  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakeProjectsRepository = new FakeProjectsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createComment = new CreateCommentService(
      fakeCommentsRepository,
      fakeProjectsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create a new comment', async () => {
    const project = await fakeProjectsRepository.create({
      name: '',
      code: '',
      initiative: '',
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
      creater_id: '',
      updater_id: '',
    });

    const comment = await createComment.execute({
      description: 'Comment 01',
      project_id: project.id,
      creater_id: 'creater-id',
      type_id: 'type',
    });

    expect(comment).toHaveProperty('id');
  });

  it('should not be able to create a new comment without inform creater-id', async () => {
    await expect(
      createComment.execute({
        description: 'Comment 01',
        project_id: 'project-id',
        creater_id: '',
        type_id: 'type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new comment without inform project-id', async () => {
    await expect(
      createComment.execute({
        description: 'Comment 01',
        project_id: '',
        creater_id: 'creater-id',
        type_id: 'type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new comment without inform description the comment', async () => {
    await expect(
      createComment.execute({
        description: '',
        project_id: 'project-id',
        creater_id: 'creater-id',
        type_id: 'type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new comment when project not found', async () => {
    await fakeProjectsRepository.create({
      name: '',
      code: '',
      initiative: '',
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
      creater_id: '',
      updater_id: '',
    });

    await expect(
      createComment.execute({
        description: 'description 123',
        project_id: 'project-id-found',
        creater_id: 'creater-id',
        type_id: 'type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
