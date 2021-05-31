import FakeStatusRepository from '../repositories/fakes/FakeStatusRepository';
import IndexStatusService from './IndexStatusService';

let fakeStatusRepository: FakeStatusRepository;
let indexStatus: IndexStatusService;

describe('IndexStatus', () => {
  beforeEach(() => {
    fakeStatusRepository = new FakeStatusRepository();
    indexStatus = new IndexStatusService(fakeStatusRepository);
  });
  it('should be able to create a new status', async () => {
    const statusOne = await fakeStatusRepository.create({
      description: 'Status 1',
      color: '#d8d8d8',
      order: 1,
    });

    const statusTwo = await fakeStatusRepository.create({
      description: 'Status 1',
      color: '#d8d8d8',
      order: 1,
    });

    const status = await indexStatus.execute();

    expect(status).toEqual([statusOne, statusTwo]);
  });
});
