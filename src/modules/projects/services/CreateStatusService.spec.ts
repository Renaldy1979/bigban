import AppError from '@shared/errors/AppError';
import FakeStatusRepository from '../repositories/fakes/FakeStatusRepository';
import CreateStatuservice from './CreateStatusService';

let fakeStatusRepository: FakeStatusRepository;
let createStatus: CreateStatuservice;

describe('CreateStatus', () => {
  beforeEach(() => {
    fakeStatusRepository = new FakeStatusRepository();
    createStatus = new CreateStatuservice(fakeStatusRepository);
  });
  it('should be able to create a new status', async () => {
    const status = await createStatus.execute({
      description: 'Status 1',
      color: '#d8d8d8',
      order: 1,
    });

    expect(status).toHaveProperty('id');
  });
  it('should not be able to create a new status with the same name', async () => {
    await createStatus.execute({
      description: 'Status 1',
      color: '#d8d8d8',
      order: 1,
    });

    expect(
      createStatus.execute({
        description: 'Status 1',
        color: '#d8d8d8',
        order: 1,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
